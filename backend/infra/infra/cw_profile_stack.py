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
from aws_cdk.aws_apigatewayv2_authorizers_alpha import (
    HttpLambdaResponseType,
    HttpLambdaAuthorizer,
)
from constructs import Construct


class CWProfileStack(Stack):
    def __init__(
        self, scope: Construct, construct_id: str, cw_core_stack: Stack, **kwargs
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create Profile lambda controller and database
        self.cw_profile_lambda = self.create_cw_profile_lambda(
            user_table=cw_core_stack.cw_user_table,
        )

        # Tie Profile Lambda to API Gateway
        self.create_profile_api_gw(
            profile_lambda=self.cw_profile_lambda["function"],
            validator_lambda=cw_core_stack.cw_validator_lambda["function"],
        )

    def create_cw_profile_lambda(self, user_table):
        # Create lambda Role
        profile_lambda_role = iam.Role(
            scope=self,
            id="cw-profile-lambda-role",
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
            id="cw-profile-lambda",
            runtime=lambdaFx.Runtime.PYTHON_3_7,
            handler="index.handler",
            role=profile_lambda_role,
            code=lambdaFx.Code.from_asset("./lambda/profile/"),
            description="CarWorld Profile Lambda, to handle Profile-related actions",
            timeout=Duration.seconds(15),
        )

        return {"function": profile_lambda, "role": profile_lambda_role}

    def create_profile_api_gw(self, profile_lambda, validator_lambda):
        # Create Profile JWT Request Authorizer lambda
        lambda_authorizer = HttpLambdaAuthorizer(
            "CWProfileRequestValidator",
            validator_lambda,
            response_types=[HttpLambdaResponseType.SIMPLE],
        )

        # Create Profile API GateWay
        profile_api = apigw.HttpApi(
            scope=self,
            id="cw-profile-api",
            description="CarWorld Profile API",
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

        # Create CarWorld Commerce Controller lambda association
        profile_controller = HttpLambdaIntegration(
            "cw-profile-controller", profile_lambda
        )

        # Create ProfileAPI routes
        #
        # /ddp_rank
        # Provide Top 5 DDP users w/ DDP count, and rank of client by DDP
        profile_api.add_routes(
            path="/profile/ddp_rank",
            methods=[apigw.HttpMethod.GET],
            integration=profile_controller,
            # This is a protected route
            authorizer=lambda_authorizer,
        )

        return
