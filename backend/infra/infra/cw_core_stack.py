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


class CWCoreStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        boto_session = boto3.Session(profile_name="personal")
        self.ssm = boto_session.client("ssm", region_name="us-east-1")
        self.jwt_secret = self.obtain_ssm_client_secret(
            secret_name="/cw/auth/jwtSecret"
        )

        self.cw_user_table = self.create_cw_user_table()

        self.cw_auth_lambda = self.create_cw_auth_lambda(
            jwt_secret=self.jwt_secret, user_table=self.cw_user_table
        )
        self.cw_validator_lambda = self.create_cw_validator_lambda(
            jwt_secret=self.jwt_secret
        )

        self.cw_api_gw = self.create_cw_api_gw(
            auth_lambda=self.cw_auth_lambda["function"]
        )

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

    def create_cw_auth_lambda(self, jwt_secret, user_table):
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
            environment={"jwtSecret": self.jwt_secret},
            timeout=Duration.seconds(15),
        )

        return {"function": registration_lambda, "role": shared_lambda_role}

    def create_cw_validator_lambda(self, jwt_secret):
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
        validator_lambda = lambdaFx.Function(
            scope=self,
            id="cw-validator-lambda",
            runtime=lambdaFx.Runtime.NODEJS_18_X,
            handler="index.handler",
            role=validator_role,
            code=lambdaFx.Code.from_asset("./lambda/validator/"),
            description="CarWorld Validator Lambda, to authenticate API requests",
            environment={"jwtSecret": self.jwt_secret},
            timeout=Duration.seconds(15),
        )

        return {"function": validator_lambda, "role": validator_role}

    def create_cw_api_gw(self, auth_lambda):
        auth_api = apigw.HttpApi(
            scope=self,
            id="cw-auth-api",
            description="CarWorld Auth Endpoints",
        )
        authController = HttpLambdaIntegration("cw-auth-controller", auth_lambda)
        auth_api.add_routes(
            path="/auth/login",
            methods=[apigw.HttpMethod.GET],
            integration=authController,
        )
        auth_api.add_routes(
            path="/auth/register",
            methods=[apigw.HttpMethod.POST],
            integration=authController,
        )
        auth_api.add_routes(
            path="/auth/refresh",
            methods=[apigw.HttpMethod.GET],
            integration=authController,
        )

        return auth_api
