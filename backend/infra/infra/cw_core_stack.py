import os
import json
import boto3
from aws_cdk import (
    Stack,
    RemovalPolicy,
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


class CWCoreStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        botoSession = boto3.Session(profile_name="personal")
        self.ssm = botoSession.client("ssm", region_name="us-east-1")
        self.jwtSecret = self.obtainSSMClientSecret(secretName="/cw/auth/jwtSecret")

        self.cwUserTable = self.createCWUserTable()

        self.cwAuthLambda = self.createCWAuthLambda(
            jwtSecret=self.jwtSecret, userTable=self.cwUserTable
        )
        self.cwValidatorLambda = self.createCWValidatorLambda(jwtSecret=self.jwtSecret)

        self.cwApiGW = self.createCWApiGW(authLambda=self.cwAuthLambda["function"])

    def obtainSSMClientSecret(self, secretName):
        jwtSecret = self.ssm.get_parameter(Name=secretName, WithDecryption=True)
        return jwtSecret["Parameter"]["Value"]

    def createCWUserTable(self):
        userTable = dynamodb.Table(
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
        userTable.add_global_secondary_index(
            index_name="username-lookup-index",
            partition_key=dynamodb.Attribute(
                name="username", type=dynamodb.AttributeType.STRING
            ),
        )

        return userTable

    def createCWAuthLambda(self, jwtSecret, userTable):
        sharedLambdaRole = iam.Role(
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
        userTable.grant_read_write_data(sharedLambdaRole)
        userTable.encryption_key.grant_encrypt_decrypt(sharedLambdaRole)
        registrationLambda = lambdaFx.Function(
            scope=self,
            id="cw-auth-registration-lambda",
            runtime=lambdaFx.Runtime.NODEJS_18_X,
            handler="index.handler",
            role=sharedLambdaRole,
            code=lambdaFx.Code.from_asset("./lambda/auth/zip"),
            description="CarWorld AuthController",
            environment={"jwtSecret": self.jwtSecret},
        )

        return {"function": registrationLambda, "role": sharedLambdaRole}

    def createCWValidatorLambda(self, jwtSecret):
        validatorRole = iam.Role(
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
        validatorLambda = lambdaFx.Function(
            scope=self,
            id="cw-validator-lambda",
            runtime=lambdaFx.Runtime.NODEJS_18_X,
            handler="index.handler",
            role=validatorRole,
            code=lambdaFx.Code.from_asset("./lambda/validator/"),
            description="CarWorld Validator Lambda, to authenticate API requests",
            environment={"jwtSecret": self.jwtSecret},
        )

        return {"function": validatorLambda, "role": validatorRole}

    # NOTE: Might need to snake_case the lib functions
    def createCWApiGW(self, authLambda):
        loginAPI = apigw.HttpApi(
            scope=self,
            id="cw-auth-api",
            description="CarWorld Auth Endpoints",
        )
        # authController = apigw.HttpIntegration(
        #     scope=self,
        #     id="cw-auth-controller",
        #     http_api=loginAPI,
        #     integration_type=apigw.HttpIntegrationType.AWS_PROXY,
        #     integration_uri=authLambda.function_arn,
        # )
        authController = HttpLambdaIntegration("cw-auth-controller", authLambda)
        loginAPI.add_routes(
            path="/auth/login",
            methods=[apigw.HttpMethod.GET],
            integration=authController,
        )
        loginAPI.add_routes(
            path="/auth/register",
            methods=[apigw.HttpMethod.POST],
            integration=authController,
        )
        loginAPI.add_routes(
            path="/auth/refresh",
            methods=[apigw.HttpMethod.GET],
            integration=authController,
        )

        return loginAPI

    #
    # NOTE: For cwStoreStack
    # transactionTable = dynamodb.Table(
    #     scope=self,
    #     id="transaction",
    #     table_name="transaction",
    #     partition_key=dynamodb.Attribute(
    #         name="id",
    #         type=dynamodb.AttributeType.STRING,
    #         billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
    #         encryption=dynamodb.TableEncryption.AWS_MANAGED,
    #     ),
    #     sort_key=Attribute(name="accountId", type=AttributeType.STRING),
    #     removal_policy=RemovalPolicy.DESTROY,
    # )
    # transactionTable.add_global_secondary_index(
    #     index_name="transaction-state-index",
    #     partition_key=dynamodb.Attribute(
    #         name="id", type=dynamodb.AttributeType.STRING
    #     ),
    #     sort_key=dynamodb.Attribute(
    #         name="state", type=dynamodb.AttributeType.STRING
    #     ),
    # )

    # commodityTable = dynamodb.Table(
    #     scope=self,
    #     id="commodity",
    #     table_name="commodity",
    #     partition_key=dynamodb.Attribute(
    #         name="id",
    #         type=dynamodb.AttributeType.STRING,
    #         billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
    #         encryption=dynamodb.TableEncryption.AWS_MANAGED,
    #     ),
    #     sort_key=Attribute(name="type", type=AttributeType.STRING),
    #     removal_policy=RemovalPolicy.DESTROY,
    # )
    # For paymentAPI
    #
    # https://docs.aws.amazon.com/cdk/api/v1/docs/aws-apigatewayv2-authorizers-readme.html
    # http_authorizer = apigw.HttpLambdaAuthorizer(
    #     self,
    #     "cw-jwt-lambda-authorizer",
    #     http_api=paymentAPI,
    #     authorizer_uri="lambdaArn maybe?",
    #     type=apigatewayv2_alpha.HttpAuthorizerType.LAMBDA
    # )
    #
    # sharedLambdaRole.add_to_policy(
    #     iam.PolicyStatement(
    #         effect=iam.Effect.ALLOW,
    #         actions=[
    #             "service:Action"
    #         ],
    #         resources=[
    #             'resource_arn'
    #         ]
    #     )
    # )
