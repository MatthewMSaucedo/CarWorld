#!/usr/bin/env python3
import os

import aws_cdk as cdk

from infra.cw_core_stack import CWCoreStack
from infra.cw_commerce_stack import CWCommerceStack
from infra.cw_profile_stack import CWProfileStack

app = cdk.App()

config = app.node.try_get_context("config")
account_id = config["account_id"]
region = config["region"]

cwCoreStack = CWCoreStack(
    scope=app,
    construct_id="InfraStack",
    env=cdk.Environment(account=account_id, region=region),
)
cwCommerceStack = CWCommerceStack(
    scope=app,
    construct_id="CommerceStack",
    cw_core_stack=cwCoreStack,
    env=cdk.Environment(account=account_id, region=region),
)
cwProfileStack = CWProfileStack(
    scope=app,
    construct_id="ProfileStack",
    cw_core_stack=cwCoreStack,
    env=cdk.Environment(account=account_id, region=region),
)

app.synth()
