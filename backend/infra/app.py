#!/usr/bin/env python3
import os

import aws_cdk as cdk

from infra.cw_core_stack import CWCoreStack

app = cdk.App()

config = app.node.try_get_context("config")
account_id = config["account_id"]
region = config["region"]
stack_env = config["stack_env"]

cwCoreStack = CWCoreStack(
    scope=app,
    construct_id=f"{stack_env}-cw-core-stack",
    env=cdk.Environment(account=account_id, region=region),
    stack_env=stack_env,
)

app.synth()
