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
    aws_apigatewayv2_alpha as apigw,
)
from aws_cdk.aws_apigatewayv2_integrations_alpha import (
    HttpUrlIntegration,
    HttpLambdaIntegration,
)
from constructs import Construct


class CWCommerceStack(Stack):
    def __init__(
        self, scope: Construct, construct_id: str, coreStack: Stack, **kwargs
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        botoSession = boto3.Session(profile_name="personal")
        self.transactionSalt = "5@&uS2SWX^WAoSiZ"

        # Obtain secrets
        self.ssm = botoSession.client("ssm", region_name="us-east-1")
        self.stripeSecret = self.obtainSSMClientSecret(
            secretName="/cw/commerce/stripe/dev/key"
        )
        # self.jwtSecret = self.obtainSSMClientSecret(secretName="/cw/auth/jwtSecret")

        # Create commerce lambda controller and database
        self.cwTransactionTable = self.createCWTransactionTable()
        self.cwCommodityTable = self.createCWCommodityTable()
        self.cwCommerceLambda = self.createCWCommerceLambda(
            stripeSecret=self.stripeSecret,
            transactionTable=self.cwTransactionTable,
            commodityTable=self.cwCommodityTable,
        )

        # TODO: Cron job that I think we need ??
        #       for the record cleanup ??
        #       input: cwTransactionTable
        # self.cwCleanupTransactionLambda(cwTransactionTable)

        self.createCommerceApiGw(self.cwCommerceLambda["function"])

    def obtainSSMClientSecret(self, secretName):
        jwtSecret = self.ssm.get_parameter(Name=secretName, WithDecryption=True)
        return jwtSecret["Parameter"]["Value"]

    def createCWTransactionTable(self):
        transactionTable = dynamodb.Table(
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
        transactionTable.add_global_secondary_index(
            index_name="transaction-state-index",
            partition_key=dynamodb.Attribute(
                name="state", type=dynamodb.AttributeType.STRING
            ),
        )
        transactionTable.add_global_secondary_index(
            index_name="transaction-account-index",
            partition_key=dynamodb.Attribute(
                name="account_id", type=dynamodb.AttributeType.STRING
            ),
        )

        return transactionTable

    def createCWCommodityTable(self):
        commodityTable = dynamodb.Table(
            scope=self,
            id="commodity",
            table_name="commodity",
            partition_key=dynamodb.Attribute(
                name="name",
                type=dynamodb.AttributeType.STRING,
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            encryption=dynamodb.TableEncryption.AWS_MANAGED,
            removal_policy=RemovalPolicy.DESTROY,
        )
        commodityTable.add_global_secondary_index(
            index_name="commodity-type-index",
            partition_key=dynamodb.Attribute(
                name="type", type=dynamodb.AttributeType.STRING
            ),
        )
        return commodityTable

    def createCWCommerceLambda(self, stripeSecret, transactionTable, commodityTable):
        commerceLambdaRole = iam.Role(
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

        # External Packages
        lambdaLayer = lambdaFx.LayerVersion(
            self,
            "lambda-layer",
            code=lambdaFx.AssetCode("lambda/commerce/layer/"),
            compatible_runtimes=[lambdaFx.Runtime.PYTHON_3_7],
        )

        # Grant db access
        transactionTable.grant_read_write_data(commerceLambdaRole)
        # transactionTable.encryption_key.grant_encrypt_decrypt(commerceLambdaRole)
        commodityTable.grant_read_write_data(commerceLambdaRole)
        # commodityTable.encryption_key.grant_encrypt_decrypt(commerceLambdaRole)

        commerceLambda = lambdaFx.Function(
            scope=self,
            id="cw-commerce-lambda",
            runtime=lambdaFx.Runtime.PYTHON_3_7,
            handler="index.handler",
            role=commerceLambdaRole,
            code=lambdaFx.Code.from_asset("./lambda/commerce/"),
            description="CarWorld Commerce Lambda, to handle purchases",
            environment={
                "stripe_secret": stripeSecret,
                "transaction_salt": self.transactionSalt,
            },
            layers=[lambdaLayer],
            timeout=Duration.seconds(15),
        )

        return {"function": commerceLambda, "role": commerceLambdaRole}

    def createCommerceApiGw(self, commerceLambda):
        commerceAPI = apigw.HttpApi(
            scope=self,
            id="cw-commerce-api",
            description="CarWorld Commerce Endpoints",
        )
        commerceController = HttpLambdaIntegration(
            "cw-commerce-controller", commerceLambda
        )
        commerceAPI.add_routes(
            path="/commerce/secret",
            methods=[apigw.HttpMethod.POST],
            integration=commerceController,
        )
        commerceAPI.add_routes(
            path="/commerce/webhook",
            methods=[apigw.HttpMethod.POST],
            integration=commerceController,
        )
        commerceAPI.add_routes(
            path="/commerce/update_transaction",
            methods=[apigw.HttpMethod.POST],
            integration=commerceController,
        )

        return commerceAPI
