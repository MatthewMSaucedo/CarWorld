import os
import json
import boto3
from aws_cdk import (
    Stack,
    RemovalPolicy,
    Duration,
    aws_lambda as lambdaFx,
    aws_dynamodb as dynamodb,
    aws_iam as iam,
    aws_ses as ses,
    aws_apigatewayv2_alpha as apigw,
)
from aws_cdk.aws_apigatewayv2_integrations_alpha import (
    HttpUrlIntegration,
    HttpLambdaIntegration,
)
from constructs import Construct


class CWCommerceStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        boto_session = boto3.Session(profile_name="personal")
        self.transaction_salt = "5@&uS2SWX^WAoSiZ"

        # Obtain secrets
        self.ssm = boto_session.client("ssm", region_name="us-east-1")
        self.stripe_secret = self.obtain_ssm_client_secret(
            secret_name="/cw/commerce/stripe/dev/key"
        )
        # self.jwt_secret = self.obtain_ssm_client_secret(secret_name="/cw/auth/jwtSecret")

        # Create commerce lambda controller and database
        self.cw_transaction_table = self.create_cw_transaction_table()
        self.cw_commodity_table = self.create_cw_commodity_table()
        self.cw_commerce_lambda = self.create_cw_commerce_lambda(
            stripe_secret=self.stripe_secret,
            transaction_table=self.cw_transaction_table,
            commodity_table=self.cw_commodity_table,
        )

        # Initialize AmazonSES and grant send permissions to the Commerce Lambda
        self.cw_ses_service = self.create_cw_ses_service(self.cw_commerce_lambda)

        # TODO: Cron job that we need
        #       for the record cleanup
        #       input: cw_transaction_table
        # self.cwCleanupTransactionLambda(cw_transaction_table)

        self.create_commerce_api_gw(self.cw_commerce_lambda["function"])

    def obtain_ssm_client_secret(self, secret_name):
        jwt_secret = self.ssm.get_parameter(Name=secret_name, WithDecryption=True)
        return jwt_secret["Parameter"]["Value"]

    def create_cw_transaction_table(self):
        transaction_table = dynamodb.Table(
            scope=self,
            id="transactions",
            table_name="transactions",
            partition_key=dynamodb.Attribute(
                name="id",
                type=dynamodb.AttributeType.STRING,
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            encryption=dynamodb.TableEncryption.AWS_MANAGED,
            removal_policy=RemovalPolicy.DESTROY,
        )
        transaction_table.add_global_secondary_index(
            index_name="transaction-state-index",
            partition_key=dynamodb.Attribute(
                name="state", type=dynamodb.AttributeType.STRING
            ),
        )
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
            id="commodities",
            table_name="commodities",
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

    def create_cw_commerce_lambda(
        self, stripe_secret, transaction_table, commodity_table
    ):
        commerce_lambda_role = iam.Role(
            scope=self,
            id="cw-commerce-lambda-role",
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
            "lambda-layer",
            code=lambdaFx.AssetCode("lambda/commerce/layer/"),
            compatible_runtimes=[lambdaFx.Runtime.PYTHON_3_7],
        )

        # Grant db access
        transaction_table.grant_read_write_data(commerce_lambda_role)
        commodity_table.grant_read_write_data(commerce_lambda_role)

        commerce_lambda = lambdaFx.Function(
            scope=self,
            id="cw-commerce-lambda",
            runtime=lambdaFx.Runtime.PYTHON_3_7,
            handler="index.handler",
            role=commerce_lambda_role,
            code=lambdaFx.Code.from_asset("./lambda/commerce/"),
            description="CarWorld Commerce Lambda, to handle purchases",
            environment={
                "stripe_secret": stripe_secret,
                "transaction_salt": self.transaction_salt,
            },
            layers=[lambda_layer],
            timeout=Duration.seconds(15),
        )

        return {"function": commerce_lambda, "role": commerce_lambda_role}

    def create_cw_ses_service(self, cw_commerce_lambda):
        ses_config_set = ses.ConfigurationSet(
            self,
            "cw-commerce-ses-configuration-set",
        )

        # grant lambda role ses perms & share ses_id to function
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
        cw_commerce_lambda["function"].add_environment(
            key="ses_config_id", value="cw-commerce-ses-configuration-set"
        )

        return ses_config_set

    def create_commerce_api_gw(self, commerce_lambda):
        commerce_api = apigw.HttpApi(
            scope=self,
            id="cw-commerce-api",
            description="CarWorld Commerce Endpoints",
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
        commerce_controller = HttpLambdaIntegration(
            "cw-commerce-controller", commerce_lambda
        )
        commerce_api.add_routes(
            path="/commerce/secret",
            methods=[apigw.HttpMethod.POST],
            integration=commerce_controller,
        )
        commerce_api.add_routes(
            path="/commerce/webhook",
            methods=[apigw.HttpMethod.POST],
            integration=commerce_controller,
        )
        commerce_api.add_routes(
            path="/commerce/commodities",
            methods=[apigw.HttpMethod.GET, apigw.HttpMethod.OPTIONS],
            integration=commerce_controller,
        )

        return commerce_api
