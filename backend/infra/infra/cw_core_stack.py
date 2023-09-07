import os
import json
import boto3
from aws_cdk import (
    Stack,
    RemovalPolicy,
    Duration,
    aws_lambda as lambdaFx,
    aws_dynamodb as dynamodb,
    aws_s3 as s3,
    aws_iam as iam,
    aws_ses as ses,
    aws_apigatewayv2_alpha as apigw,
)
from aws_cdk.aws_apigatewayv2_integrations_alpha import (
    HttpLambdaIntegration,
    HttpUrlIntegration,
)
from aws_cdk.aws_apigatewayv2_authorizers_alpha import (
    HttpLambdaResponseType,
    HttpLambdaAuthorizer,
)
from constructs import Construct


# (Car World Core Stack)
#   This stack covers the core pieces of the Car World infra. This includes:
#     * CarWorld API Gateway
#     * Auth Controller and associated Databases
#     * Commerce Controller and associated Databases
#     * Profile Controller and associated Databases
#     * CarWorld SES (email service)
class CWCoreStack(Stack):
    def __init__(
        self, scope: Construct, construct_id: str, stack_env: str, **kwargs
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)
        # Development environment (dev/prod)
        self.stack_env = stack_env

        ###############################################
        # SECRETS (stored in AWS SSM ParamStore)
        ###############################################
        boto_session = boto3.Session(profile_name="personal")
        self.ssm = boto_session.client("ssm", region_name="us-east-1")
        self.jwt_secret = self.obtain_ssm_client_secret(
            secret_name="/cw/auth/jwtSecret"
        )
        self.jwt_exp_minutes = self.obtain_ssm_client_secret(
            secret_name="/cw/auth/jwtExpMinutes"
        )
        self.stripe_secret = self.obtain_ssm_client_secret(
            secret_name="/cw/commerce/stripe/dev/key"
        )

        ###############################################
        # DATABASES (Dynamo)
        ###############################################
        # Create Users database
        self.cw_user_table = self.create_cw_user_table()
        # Create Transactions database
        self.cw_transaction_table = self.create_cw_transaction_table()
        # Create Commodity database
        self.cw_commodity_table = self.create_cw_commodity_table()
        # Create InvalidTokens database
        self.cw_invalid_token_table = self.create_cw_invalid_token_table()

        ###############################################
        # CAR WORLD API GATEWAY
        ###############################################
        # Create API Gateway
        self.cw_api_gw = self.create_cw_api_gw()
        # Create AuthValidator Lambda
        self.cw_validator_lambda = self.create_cw_validator_lambda(
            jwt_secret=self.jwt_secret, jwt_exp_minutes=self.jwt_exp_minutes
        )

        ###############################################
        # AUTH CONTROLLER
        ###############################################
        # Create Auth Controller Lambda and associate w/ API Gateway
        self.cw_auth_lambda = self.create_cw_auth_lambda(
            jwt_secret=self.jwt_secret,
            jwt_exp_minutes=self.jwt_exp_minutes,
            user_table=self.cw_user_table,
            invalid_token_table=self.cw_invalid_token_table,
        )
        # Tie Auth Lambda to API Gateway
        self.add_auth_routes_to_api_gw(
            cw_api_gw=self.cw_api_gw,
            auth_lambda=self.cw_auth_lambda["function"],
        )

        ###############################################
        # COMMERCE CONTROLLER
        ###############################################
        # Create Commerce Controller Lambda and associate w/ API Gateway
        self.cw_commerce_lambda = self.create_cw_commerce_lambda(
            stripe_secret=self.stripe_secret,
            transaction_table=self.cw_transaction_table,
            commodity_table=self.cw_commodity_table,
            user_table=self.cw_user_table,
        )
        # Tie Commerce Lambda to API Gateway
        self.add_commerce_routes_to_api_gw(
            cw_api_gw=self.cw_api_gw,
            commerce_lambda=self.cw_commerce_lambda["function"],
            validator_lambda=self.cw_validator_lambda["function"],
        )

        ###############################################
        # PROFILE CONTROLLER
        ###############################################
        # Create Profile Controller Lambda and associate w/ API Gateway
        self.cw_profile_lambda = self.create_cw_profile_lambda(
            user_table=self.cw_user_table,
        )
        # Tie Profile Lambda to API Gateway
        self.add_profile_routes_to_api_gw(
            cw_api_gw=self.cw_api_gw,
            profile_lambda=self.cw_profile_lambda["function"],
            validator_lambda=self.cw_validator_lambda["function"],
        )

        ###############################################
        # CAR WORLD SES (Email Service)
        ###############################################
        # Initialize AmazonSES and grant Send permissions to the Commerce Lambda
        self.cw_ses_service = self.create_cw_ses_service(self.cw_commerce_lambda)

        ###############################################
        # CAR WORLD JOBS
        ###############################################
        # Init StoreItem db
        self.create_cw_batch_write_store_items_lambda = (
            self.cw_batch_write_store_items_lambda(self.cw_commodity_table)
        )

        # TODO: Lambda to handle db retries for sensitive writes
        # Create the queue, dead_letter_q, and DB Retry Lambda for corrective actions
        # self.cw_db_retry_lambda = self.create_cw_db_retry_lambda()

    def obtain_ssm_client_secret(self, secret_name):
        jwt_secret = self.ssm.get_parameter(Name=secret_name, WithDecryption=True)
        return jwt_secret["Parameter"]["Value"]

    def create_cw_user_table(self):
        # Create User table
        user_table = dynamodb.Table(
            scope=self,
            id=f"{self.stack_env}-users",
            # PK: id, a guuid
            partition_key=dynamodb.Attribute(
                name="id",
                type=dynamodb.AttributeType.STRING,
            ),
            removal_policy=RemovalPolicy.DESTROY,
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            encryption=dynamodb.TableEncryption.AWS_MANAGED,
        )

        # Search user by username
        user_table.add_global_secondary_index(
            index_name="username-lookup-index",
            partition_key=dynamodb.Attribute(
                name="username", type=dynamodb.AttributeType.STRING
            ),
        )

        return user_table

    def create_cw_invalid_token_table(self):
        invalid_token_table = dynamodb.Table(
            scope=self,
            id=f"{self.stack_env}-invalid_tokens",
            # PK: jti, a guuid
            partition_key=dynamodb.Attribute(
                name="jti",
                type=dynamodb.AttributeType.STRING,
            ),
            removal_policy=RemovalPolicy.DESTROY,
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            encryption=dynamodb.TableEncryption.AWS_MANAGED,
            # NOTE: Refresh tokens become invalid after hitting their
            # expiry time, so there is no need to maintain them after that.
            # Let's let Dynamo clean these up for us!
            time_to_live_attribute="ttl",
        )

        return invalid_token_table

    def create_cw_transaction_table(self):
        transaction_table = dynamodb.Table(
            scope=self,
            id=f"{self.stack_env}-transactions",
            # PK: id, a guuid
            partition_key=dynamodb.Attribute(
                name="id",
                type=dynamodb.AttributeType.STRING,
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            encryption=dynamodb.TableEncryption.AWS_MANAGED,
            removal_policy=RemovalPolicy.DESTROY,
        )
        # Index to search by transaction state
        transaction_table.add_global_secondary_index(
            index_name="transaction-state-index",
            partition_key=dynamodb.Attribute(
                name="state", type=dynamodb.AttributeType.STRING
            ),
        )
        # Index to search by AccountID
        transaction_table.add_global_secondary_index(
            index_name="transaction-account-index",
            partition_key=dynamodb.Attribute(
                name="account_id", type=dynamodb.AttributeType.STRING
            ),
        )

        return transaction_table

    def create_cw_commodity_table(self):
        commodity_table = dynamodb.Table(
            scope=self,
            id=f"{self.stack_env}-commodities",
            # PK: product_name, a string
            partition_key=dynamodb.Attribute(
                name="product_name",
                type=dynamodb.AttributeType.STRING,
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            encryption=dynamodb.TableEncryption.AWS_MANAGED,
            removal_policy=RemovalPolicy.DESTROY,
        )
        commodity_table.add_global_secondary_index(
            index_name="commodity-type-index",
            partition_key=dynamodb.Attribute(
                name="product_type", type=dynamodb.AttributeType.STRING
            ),
        )
        return commodity_table

    def cw_batch_write_store_items_lambda(self, cw_commodity_table):
        batch_write_store_items_lambda_role = iam.Role(
            scope=self,
            id=f"{self.stack_env}-cw-batch-write-store-items-lambda-role",
            assumed_by=iam.ServicePrincipal("lambda.amazonaws.com"),
            description="Lambda Role to populate CW Store Items in CWCommodity Table",
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name(
                    "service-role/AWSLambdaBasicExecutionRole"
                )
            ],
        )
        cw_commodity_table.grant_write_data(batch_write_store_items_lambda_role)

        batch_write_store_items_lambda = lambdaFx.Function(
            scope=self,
            id=f"{self.stack_env}-cw-batch-write-store-items-lambda",
            runtime=lambdaFx.Runtime.PYTHON_3_7,
            handler="batch_write_store_items.handler",
            role=batch_write_store_items_lambda_role,
            code=lambdaFx.Code.from_asset("./lambda/jobs/"),
            description="CarWorld Batch Commodity Writer",
            environment={
                "commodity_table_name": cw_commodity_table.table_name,
            },
            timeout=Duration.seconds(15),
        )

        return {
            "function": batch_write_store_items_lambda,
            "role": batch_write_store_items_lambda_role,
        }

    def create_cw_auth_lambda(
        self, jwt_secret, jwt_exp_minutes, user_table, invalid_token_table
    ):
        auth_lambda_role = iam.Role(
            scope=self,
            id=f"{self.stack_env}-cw-auth-lambda-role",
            assumed_by=iam.ServicePrincipal("lambda.amazonaws.com"),
            description="Lambda Role with access to Auth table",
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name(
                    "service-role/AWSLambdaBasicExecutionRole"
                )
            ],
        )
        invalid_token_table.grant_read_data(auth_lambda_role)
        user_table.grant_read_write_data(auth_lambda_role)

        registration_lambda = lambdaFx.Function(
            scope=self,
            id=f"{self.stack_env}-cw-auth-registration-lambda",
            runtime=lambdaFx.Runtime.NODEJS_18_X,
            handler="function/index.handler",
            role=auth_lambda_role,
            # TODO: fix this, upload manually for now
            code=lambdaFx.Code.from_asset("./lambda/auth/zip"),
            description="CarWorld AuthController",
            environment={
                "jwtSecret": jwt_secret,
                "jwtExpMinutes": jwt_exp_minutes,
                "userTableName": user_table.table_name,
                "invalidTokenTableName": invalid_token_table.table_name,
            },
            memory_size=512,
            timeout=Duration.seconds(15),
        )

        return {"function": registration_lambda, "role": auth_lambda_role}

    def create_cw_validator_lambda(self, jwt_secret, jwt_exp_minutes):
        validator_role = iam.Role(
            scope=self,
            id=f"{self.stack_env}-cw-validator-lambda-role",
            assumed_by=iam.ServicePrincipal("lambda.amazonaws.com"),
            description="Validator Lambda Role",
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name(
                    "service-role/AWSLambdaBasicExecutionRole"
                )
            ],
        )

        # External Packages (JWT Library)
        # NOTE: Generation guide:
        #   https://medium.com/geekculture/deploying-aws-lambda-layers-with-python-8b15e24bdad2
        #   So essentially, creating a `layer` folder, and running the following:
        #   pip3 install [[PACKAGE]] --target ~/CarWorld/backend/infra/lambda/validator/layer/python/lib/python3.7/site-packages
        jwt_lambda_layer = lambdaFx.LayerVersion(
            self,
            f"{self.stack_env}-jwt-lambda-layer",
            code=lambdaFx.AssetCode("lambda/validator/jwt-layer/"),
            compatible_runtimes=[lambdaFx.Runtime.PYTHON_3_7],
        )
        jwt_dependency_lambda_layer = lambdaFx.LayerVersion(
            self,
            f"{self.stack_env}-jwt-dependency-lambda-layer",
            code=lambdaFx.AssetCode("lambda/validator/jwt-dependency-layer/"),
            compatible_runtimes=[lambdaFx.Runtime.PYTHON_3_7],
        )

        validator_lambda = lambdaFx.Function(
            scope=self,
            id=f"{self.stack_env}-cw-validator-lambda",
            runtime=lambdaFx.Runtime.PYTHON_3_7,
            handler="index.handler",
            role=validator_role,
            code=lambdaFx.Code.from_asset("./lambda/validator/"),
            description="CarWorld Validator Lambda, to authenticate API requests",
            environment={"jwtSecret": jwt_secret, "jwtExpMinutes": jwt_exp_minutes},
            layers=[jwt_lambda_layer, jwt_dependency_lambda_layer],
            memory_size=512,
            timeout=Duration.seconds(15),
        )

        return {"function": validator_lambda, "role": validator_role}

    def create_cw_api_gw(self):
        # Create CarWorld API Gateway
        cw_api = apigw.HttpApi(
            scope=self,
            id=f"{self.stack_env}-cw-auth-api",
            description="CarWorld API Gateway",
            cors_preflight=apigw.CorsPreflightOptions(
                allow_headers=["*"],
                allow_methods=[
                    apigw.CorsHttpMethod.GET,
                    apigw.CorsHttpMethod.HEAD,
                    apigw.CorsHttpMethod.OPTIONS,
                    apigw.CorsHttpMethod.POST,
                ],
                allow_origins=["*"],
                max_age=Duration.days(10),
            ),
        )

        return cw_api

    def create_cw_commerce_lambda(
        self, stripe_secret, transaction_table, commodity_table, user_table
    ):
        commerce_lambda_role = iam.Role(
            scope=self,
            id=f"{self.stack_env}-cw-commerce-lambda-role",
            assumed_by=iam.ServicePrincipal("lambda.amazonaws.com"),
            description="Commerce Lambda Role",
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name(
                    "service-role/AWSLambdaBasicExecutionRole"
                ),
                iam.ManagedPolicy.from_aws_managed_policy_name(
                    "service-role/AWSLambdaVPCAccessExecutionRole"
                ),
            ],
        )

        # External Packages (Stripe)
        # Generation guide:
        #   https://medium.com/geekculture/deploying-aws-lambda-layers-with-python-8b15e24bdad2
        lambda_layer = lambdaFx.LayerVersion(
            self,
            f"{self.stack_env}-stripe-layer",
            code=lambdaFx.AssetCode("lambda/commerce/layer/"),
            compatible_runtimes=[lambdaFx.Runtime.PYTHON_3_7],
        )

        # Grant db access
        transaction_table.grant_read_write_data(commerce_lambda_role)
        user_table.grant_read_write_data(commerce_lambda_role)
        commodity_table.grant_read_write_data(commerce_lambda_role)

        commerce_lambda = lambdaFx.Function(
            scope=self,
            id=f"{self.stack_env}-cw-commerce-lambda",
            runtime=lambdaFx.Runtime.PYTHON_3_7,
            handler="index.handler",
            role=commerce_lambda_role,
            code=lambdaFx.Code.from_asset("./lambda/commerce/"),
            description="CarWorld Commerce Lambda, to handle purchases",
            environment={
                "stripe_secret": stripe_secret,
                "user_table_name": user_table.table_name,
                "commodity_table_name": commodity_table.table_name,
                "transaction_table_name": transaction_table.table_name,
            },
            layers=[lambda_layer],
            memory_size=512,
            timeout=Duration.seconds(15),
        )

        return {"function": commerce_lambda, "role": commerce_lambda_role}

    def add_auth_routes_to_api_gw(self, cw_api_gw, auth_lambda):
        # Create CarWorld Auth Controller lambda association
        auth_controller = HttpLambdaIntegration(
            f"{self.stack_env}-cw-auth-controller", auth_lambda
        )

        # Create AuthAPI routes
        #
        # /login
        # Login a user and return auth & refresh tokens
        cw_api_gw.add_routes(
            path="/auth/login",
            methods=[apigw.HttpMethod.POST],
            integration=auth_controller,
        )
        #
        # /register
        # Register a new user
        cw_api_gw.add_routes(
            path="/auth/register",
            methods=[apigw.HttpMethod.POST],
            integration=auth_controller,
        )
        #
        # /refresh
        # Refresh a user's authtoken when provided with a valid refresh token
        cw_api_gw.add_routes(
            path="/auth/refresh",
            methods=[apigw.HttpMethod.POST],
            integration=auth_controller,
        )
        #
        # /guest
        # Provide a short lived guest token
        cw_api_gw.add_routes(
            path="/auth/guest",
            methods=[apigw.HttpMethod.GET],
            integration=auth_controller,
        )

        return

    def add_commerce_routes_to_api_gw(
        self, cw_api_gw, commerce_lambda, validator_lambda
    ):
        # Create Commerce JWT Request Authorizer lambda
        lambda_authorizer = HttpLambdaAuthorizer(
            f"{self.stack_env}-CWCommerceRequestValidator",
            validator_lambda,
            response_types=[HttpLambdaResponseType.SIMPLE],
        )

        # Create CarWorld Commerce Controller lambda association
        commerce_controller = HttpLambdaIntegration(
            f"{self.stack_env}-cw-commerce-controller", commerce_lambda
        )

        # Create CommerceAPI routes
        #
        # /secret
        # Provide unique Stripe PaymentIntent secret to client
        cw_api_gw.add_routes(
            path="/commerce/secret",
            methods=[apigw.HttpMethod.POST],
            integration=commerce_controller,
            # This is a protected route
            authorizer=lambda_authorizer,
        )
        #
        # /webhook
        # Provide Stripe Servers an endpoint to update CW on Transactions
        cw_api_gw.add_routes(
            path="/commerce/webhook",
            methods=[apigw.HttpMethod.POST],
            integration=commerce_controller,
        )
        #
        # /commodities
        # Provide commodity list to FE
        cw_api_gw.add_routes(
            path="/commerce/commodities",
            methods=[apigw.HttpMethod.GET],
            integration=commerce_controller,
        )

        return

    def create_cw_profile_lambda(self, user_table):
        # Create lambda Role
        profile_lambda_role = iam.Role(
            scope=self,
            id=f"{self.stack_env}-cw-profile-lambda-role",
            assumed_by=iam.ServicePrincipal("lambda.amazonaws.com"),
            description="Profile Lambda Role",
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name(
                    "service-role/AWSLambdaBasicExecutionRole"
                ),
                iam.ManagedPolicy.from_aws_managed_policy_name(
                    "service-role/AWSLambdaVPCAccessExecutionRole"
                ),
            ],
        )

        # Grant db access
        user_table.grant_read_write_data(profile_lambda_role)

        # Create lambda
        profile_lambda = lambdaFx.Function(
            scope=self,
            id=f"{self.stack_env}-cw-profile-lambda",
            runtime=lambdaFx.Runtime.PYTHON_3_7,
            handler="index.handler",
            role=profile_lambda_role,
            code=lambdaFx.Code.from_asset("./lambda/profile/"),
            description="CarWorld Profile Lambda, to handle Profile-related actions",
            environment={"user_table_name": user_table.table_name},
            memory_size=512,
            timeout=Duration.seconds(15),
        )

        return {"function": profile_lambda, "role": profile_lambda_role}

    def add_profile_routes_to_api_gw(self, cw_api_gw, profile_lambda, validator_lambda):
        # Create Profile JWT Request Authorizer lambda
        lambda_authorizer = HttpLambdaAuthorizer(
            f"{self.stack_env}-CWProfileRequestValidator",
            validator_lambda,
            response_types=[HttpLambdaResponseType.SIMPLE],
        )

        # Create CarWorld Commerce Controller lambda association
        profile_controller = HttpLambdaIntegration(
            f"{self.stack_env}-cw-profile-controller", profile_lambda
        )

        # Create ProfileAPI routes
        #
        # /ddp_rank
        # Provide Top x DDP users w/ DDP count, and rank of client by DDP
        cw_api_gw.add_routes(
            path="/profile/ddp_rank",
            methods=[apigw.HttpMethod.GET],
            integration=profile_controller,
            # This is a protected route
            authorizer=lambda_authorizer,
        )

        return

    def create_cw_ses_service(self, cw_commerce_lambda):
        ses_config_set = ses.ConfigurationSet(
            self,
            f"{self.stack_env}-cw-commerce-ses-configuration-set",
        )

        # Grant lambda role ses perms & share ses_id to function
        cw_commerce_lambda["role"].attach_inline_policy(
            iam.Policy(
                self,
                "ses-policy",
                statements=[
                    iam.PolicyStatement(
                        actions=[
                            "ses:SendEmail",
                            "ses:SendTemplatedEmail",
                            "ses:SendRawEmail",
                            "ses:SendBulkTemplatedEmail",
                        ],
                        resources=["*"],
                    )
                ],
            )
        )

        # Add SES ID to Commerce Lambda environment variables
        cw_commerce_lambda["function"].add_environment(
            key="ses_config_id", value=ses_config_set.configuration_set_name
        )

        return ses_config_set
