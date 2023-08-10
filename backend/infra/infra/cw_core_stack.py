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
    aws_apigatewayv2_alpha as apigw,
)
from aws_cdk.aws_apigatewayv2_integrations_alpha import (
    HttpUrlIntegration,
    HttpLambdaIntegration,
)
from constructs import Construct


# (Car World Core Stack)
#   This stack covers the core pieces of the Car World infra
class CWCoreStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        boto_session = boto3.Session(profile_name="personal")
        self.ssm = boto_session.client("ssm", region_name="us-east-1")
        self.jwt_secret = self.obtain_ssm_client_secret(
            secret_name="/cw/auth/jwtSecret"
        )
        self.jwt_exp_minutes = self.obtain_ssm_client_secret(
            secret_name="/cw/auth/jwtExpMinutes"
        )

        # Create the Users table
        self.cw_user_table = self.create_cw_user_table()

        # Create the InvalidTokens Table
        # NOTE: A hugely important mechanism to invalidate compromised Refresh tokens
        self.cw_invalid_token_table = self.create_cw_invalid_token_table()

        # Create the AuthController Lambda
        self.cw_auth_lambda = self.create_cw_auth_lambda(
            jwt_secret=self.jwt_secret,
            jwt_exp_minutes=self.jwt_exp_minutes,
            user_table=self.cw_user_table,
            invalid_token_table=self.cw_invalid_token_table,
        )

        # Create the AuthValidator Lambda
        self.cw_validator_lambda = self.create_cw_validator_lambda(
            jwt_secret=self.jwt_secret, jwt_exp_minutes=self.jwt_exp_minutes
        )

        # Create the API Gateway
        self.cw_api_gw = self.create_cw_api_gw(
            auth_lambda=self.cw_auth_lambda["function"]
        )

        # TODO: Lambda to handle db retries for sensitive writes
        # Create the DB Retry Lambda for corrective actions
        # self.cw_db_retry_lambda = self.create_cw_db_retry_lambda()

    def obtain_ssm_client_secret(self, secret_name):
        jwt_secret = self.ssm.get_parameter(Name=secret_name, WithDecryption=True)
        return jwt_secret["Parameter"]["Value"]

    def create_cw_user_table(self):
        user_table = dynamodb.Table(
            scope=self,
            id="user",
            table_name="users",
            partition_key=dynamodb.Attribute(
                name="id",
                type=dynamodb.AttributeType.STRING,
            ),
            removal_policy=RemovalPolicy.DESTROY,
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            encryption=dynamodb.TableEncryption.AWS_MANAGED,
        )
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
            id="invalid_token",
            table_name="invalid_tokens",
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

    def create_cw_auth_lambda(
        self, jwt_secret, jwt_exp_minutes, user_table, invalid_token_table
    ):
        shared_lambda_role = iam.Role(
            scope=self,
            id="cw-auth-lambda-role",
            assumed_by=iam.ServicePrincipal("lambda.amazonaws.com"),
            description="Lambda Role with access to Auth table",
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name(
                    "service-role/AWSLambdaBasicExecutionRole"
                )
            ],
        )
        invalid_token_table.grant_read_data(shared_lambda_role)
        user_table.grant_read_write_data(shared_lambda_role)

        registration_lambda = lambdaFx.Function(
            scope=self,
            id="cw-auth-registration-lambda",
            runtime=lambdaFx.Runtime.NODEJS_18_X,
            handler="function/index.handler",
            role=shared_lambda_role,
            # TODO: fix this, upload manually for now
            code=lambdaFx.Code.from_asset("./lambda/auth/zip"),
            description="CarWorld AuthController",
            environment={"jwtSecret": jwt_secret, "jwtExpMinutes": jwt_exp_minutes},
            timeout=Duration.seconds(15),
        )

        return {"function": registration_lambda, "role": shared_lambda_role}

    def create_cw_validator_lambda(self, jwt_secret, jwt_exp_minutes):
        validator_role = iam.Role(
            scope=self,
            id="cw-validator-lambda-role",
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
            "jwt-lambda-layer",
            code=lambdaFx.AssetCode("lambda/validator/jwt-layer/"),
            compatible_runtimes=[lambdaFx.Runtime.PYTHON_3_7],
        )
        jwt_dependency_lambda_layer = lambdaFx.LayerVersion(
            self,
            "jwt-dependency-lambda-layer",
            code=lambdaFx.AssetCode("lambda/validator/jwt-dependency-layer/"),
            compatible_runtimes=[lambdaFx.Runtime.PYTHON_3_7],
        )

        validator_lambda = lambdaFx.Function(
            scope=self,
            id="cw-validator-lambda",
            runtime=lambdaFx.Runtime.PYTHON_3_7,
            handler="index.handler",
            role=validator_role,
            code=lambdaFx.Code.from_asset("./lambda/validator/"),
            description="CarWorld Validator Lambda, to authenticate API requests",
            environment={"jwtSecret": jwt_secret, "jwtExpMinutes": jwt_exp_minutes},
            layers=[jwt_lambda_layer, jwt_dependency_lambda_layer],
            timeout=Duration.seconds(15),
        )

        return {"function": validator_lambda, "role": validator_role}

    def create_cw_api_gw(self, auth_lambda):
        auth_api = apigw.HttpApi(
            scope=self,
            id="cw-auth-api",
            description="CarWorld Auth Endpoints",
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
        authController = HttpLambdaIntegration("cw-auth-controller", auth_lambda)
        auth_api.add_routes(
            path="/auth/login",
            methods=[apigw.HttpMethod.POST],
            integration=authController,
        )
        auth_api.add_routes(
            path="/auth/register",
            methods=[apigw.HttpMethod.POST],
            integration=authController,
        )
        auth_api.add_routes(
            path="/auth/refresh",
            methods=[apigw.HttpMethod.POST],
            integration=authController,
        )

        return auth_api
