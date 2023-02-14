#!/usr/bin/env python3
import os

import aws_cdk as cdk

from infra.cw_core_stack import CWCoreStack

app = cdk.App()

config = app.node.try_get_context("config")
account_id = config["account_id"]
region = config["region"]

CWCoreStack(app, "InfraStack", env=cdk.Environment(account=account_id, region=region))

app.synth()
