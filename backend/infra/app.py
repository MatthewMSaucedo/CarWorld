#!/usr/bin/env python3
import os

import aws_cdk as cdk

from infra.cw_core_stack import CWCoreStack
from infra.cw_commerce_stack import CWCommerceStack

app = cdk.App()

config = app.node.try_get_context("config")
account_id = config["account_id"]
region = config["region"]

cwCoreStack = CWCoreStack(
    app, "InfraStack", env=cdk.Environment(account=account_id, region=region)
)
CWCommerceStack(
    scope=app,
    construct_id="CommerceStack",
    cw_core_stack=cwCoreStack,
    env=cdk.Environment(account=account_id, region=region),
)

app.synth()
