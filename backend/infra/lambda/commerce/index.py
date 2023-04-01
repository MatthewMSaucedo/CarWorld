# TODO: (Implement webhook-based Transaction update)
#       Absolutely should NOT be trusting the client to update these records,
#       however, for now this is fine. We can use the Stripe Dashboard as the
#       source of truth

# TODO: (Cleanup Transaction CRON job)
#       Given the way in which transaction records are being
#       created before they are confirmed by the user, we need to
#       have a nightly lambda that runs and terminates all transaction
#       records still in the status "initiated"

import os
import json
import traceback
import stripe
import boto3
import hashlib

transaction_salt = os.environ["transaction_salt"]
stripe.api_key = os.environ["stripe_secret"]


# TODO: Make this into a lambda layer
class CWDynamoClient:
    client = boto3.client("dynamodb")

    def update(
        table_name,
        key_expression,
        field_value_map,
        manual_expression_attribute_map=None,
    ):
        update_expression = format_update_expression(
            [*field_value_map.keys()]
            + (
                []
                if manual_expression_attribute_map is None
                else [*manual_expression_attribute_map.keys()]
            )
        )

        expression_attribute_values = {}
        for field_value_mapping in field_value_map:
            dynamo_formatted_value_mapping = dynamo_format_value_mapping(
                field_value_mapping, operation="update"
            )
            expression_attribute_values.append(dynamo_formatted_value_mapping)

        if manual_expression_attribute_map is not None:
            expression_attribute_values.append(manual_expression_attribute_map)

        res = client.update_item(
            TableName=table_name,
            Key=key_expression,
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
        )

        return res

    def create(
        table_name,
        key_expression,
        field_value_map,
        manual_expression_attribute_map=None,
    ):
        item = key_expression
        for field_value_mapping in field_value_map:
            dynamo_formatted_value_mapping = dynamo_format_value_mapping(
                field_value_mapping, operation="create"
            )
            item.append(dynamo_formatted_value_mapping)

        res = client.put_item(TableName=table_name, Item=item)

        return res

    # TODO
    def delete(table_name, field_value_map, manual_expression_attribute_map=None):
        """"""

    def dynamo_format_value_mapping(field_value_map, operation):
        key = [*field_value_map.keys()][0]
        value = field_value_map[key]

        if operation == "update":
            key = ":" + key

        dynamoType = determine_dynamo_data_type(value)

        return {key: {dynamoType: str(value) if isinstance(value, int) else value}}

    def determine_dynamo_data_type(value):
        if isinstance(value, str):
            return "S"
        elif isinstance(value, bool):
            return "BOOL"
        elif isinstance(value, int) or isinstance(value, float):
            return "N"
        elif isinstance(value, dict):
            return "M"
        # NOTE:
        # We don't support mixed-type lists. Make use
        # of manual_expression_attribute_map if you need that.
        elif isinstance(value, list):
            return "SS" if isinstance(value[0], str) else "NS"
        raise Exception(
            f"CWDynamo Client Error: Unhandled data type provided for value: {value}"
        )

    def format_update_expression(field_name_list):
        update_expression = f"SET {field_name_list[0]} = :{field_name_list[0]}"
        field_name_list.remove(field_name_list[0])

        for field_name in field_name_list:
            update_expression + f", SET {field_name} = :{field_name}"

        return update_expression


def handler(event, context):
    # parse request
    try:
        request = {
            "type": event["requestContext"]["http"]["method"],
            "action": event["rawPath"].replace("/commerce/", ""),
            "body": json.loads(event["body"]),
        }
    except Exception as e:
        return {
            "code": 500,
            "message": f"Failed to parse event into request format: {event}",
            "error": {
                "message": str(e),
                "stack": traceback.format_exc(),
            },
        }

    # initialize dynamo client
    cw_dynamo_client = CWDynamoClient()

    # direct to proper controller action
    res = ""
    try:
        if request["action"] == "secret":
            res = create_payment_intent(
                create_payment_intent_body=request["body"],
                dynamo_client=cw_dynamo_client,
            )
        elif request["action"] == "update_transaction":
            res = update_transaction(
                update_transaction_body=request["body"], dynamo_client=cw_dynamo_client
            )
        # TODO: (Implement webhook-based Transaction update)
        elif request["action"] == "webhook":
            res = handle_webhook(
                stripe_event=request["body"], dynamo_client=cw_dynamo_client
            )
    except Exception as e:
        return {
            "code": 500,
            "message": "Unhandled server error encountered",
            "error": {
                "message": str(e),
                "stack": traceback.format_exc(),
            },
        }

    return res


def update_transaction(update_transaction_body, dynamo_client):
    # validate body
    transaction_record_id = ""
    status = ""
    try:
        transaction_record_id = update_transaction_body["transaction_record_id"]
        status = update_transaction_body["status"]
    except Exception as e:
        return {
            "code": 400,
            "message": f"incorrect payload submitted to CWCC /update_transaction: {create_payment_intent_body}",
            "error": {
                "message": str(e),
                "stack": traceback.format_exc(),
            },
        }

    try:
        transaction_record = update_transaction_record_client_call(
            transaction_record_id, status, dynamo_client=dynamo_client
        )
        return {
            "code": 200,
            "message": "updated transaction_record",
        }
    except Exception as e:
        return {
            "code": 500,
            "message": "failed to update transaction_record",
            "error": {
                "message": str(e),
                "stack": traceback.format_exc(),
            },
        }


def create_payment_intent(create_payment_intent_body, dynamo_client):
    cart = {}

    # validate
    try:
        cart = create_payment_intent_body["cart"]
        for commodity in cart:
            commodity_name = commodity["name"]
            quantity = commodity["quantity"]
    except Exception as e:
        return {
            "code": 400,
            "message": f"incorrect payload submitted to CWCC /secret: got {create_payment_intent_body}, expected cart of commodities",
            "error": {
                "message": str(e),
                "stack": traceback.format_exc(),
            },
        }

    amount = 0
    commodity_value_map = {
        "test shirt (m) (variant 2)": 25,
        "test mug (variant 1)": 10,
        "test shirt (m) (variant 1)": 25,
    }
    for commodity in cart:
        client_secret = ""
        try:
            if commodity["name"] in commodity_value_map.keys():
                amount = amount + (
                    commodity_value_map[commodity["name"]] * commodity["quantity"]
                )
            else:
                raise Exception(
                    f"Invalid commodity name received: {commodity['name']}, valid names: {commodity_value_map.keys()}"
                )
        except Exception as e:
            return {
                "code": 400,
                "message": f"Failed to parse shopping cart: {cart}",
                "error": {
                    "message": str(e),
                    "stack": traceback.format_exc(),
                },
            }

    try:
        client_secret = payment_intent_client_secret = stripe.PaymentIntent.create(
            amount=amount,
            currency="usd",
            automatic_payment_methods={"enabled": True},
        ).client_secret
    except Exception as e:
        return {
            "code": 500,
            "message": "Failed to initiate Stripe Payment Intent",
            "error": {
                "message": str(e),
                "stack": traceback.format_exc(),
            },
        }

    transaction_id = ""
    try:
        # TODO: shouldn't trust client_secret is unique, so let's
        #       create a hash we can verify later
        transaction_id = some_hash_algo(client_secret, transaction_salt)
        create_transaction_record(
            cart=cart, amount=amount, transaction_id=transaction_id
        )
    except Exception as e:
        return {
            "code": 500,
            "message": "Failed to create Transaction record",
            "error": {
                "message": str(e),
                "stack": traceback.format_exc(),
            },
        }

    return {
        "code": 200,
        "message": "Succesfully created transaction",
        "body": {
            "client_secret": client_secret,
            "transaction_record_id": transaction_id,
        },
    }


def create_transaction_record(
    cart, amount, transaction_id, is_guest=True, status="initiated"
):
    dynamo_client = boto3.client("dynamodb")

    # get commodity list
    commodity_list = []
    for commodity in cart:
        commodity_list.append(commodity["name"])

    dynamo_client.put_item(
        TableName="transactions",
        Item={
            "id": {"S": transaction_id},
            "commodity_list": {"SS": commodity_list},
            "amount": {"N": str(amount)},
            "guest": {"BOOL": is_guest},
            "transaction_status": {"S": status},
        },
    )

    return


def update_transaction_record_client_call(transaction_id, status, dynamo_client):
    # dynamo_client = boto3.client("dynamodb")
    # response = dynamo_client.update_item(
    #     TableName="transactions",
    #     Key={"id": {"S": transaction_id}},
    #     UpdateExpression="SET transaction_status = :status",
    #     ExpressionAttributeValues={
    #         ":status": {"S": status},
    #     },
    # )

    response = dynamo_client.update(
        table_name="transactions",
        key_expression={"id": {"S": transaction_id}},
        field_value_map={"status": status},
    )
    return response


def update_transaction_record_webhook_call(
    transaction_id, name, shipping, status, stripe_transaction_id, dynamo_client
):
    # dynamo_client = boto3.client("dynamodb")
    # response = dynamo_client.update_item(
    #     TableName="transactions",
    #     Key={"id": transaction_id},
    #     UpdateExpression="SET status = :status, SET name = :name, SET shipping = :shipping, SET stripe_id = :stripe_id",
    #     ExpressionAttributeValues={
    #         ":status": {"S": status},
    #         ":name": {"S": name},
    #         ":shipping": {"M": shipping},
    #         ":stripe_id": {"S": stripe_transaction_id},
    #     },
    # )
    response = dynamo_client.update(
        table_name="transactions",
        key_expression={"id": {"S": transaction_id}},
        field_value_map={
            "status": status,
            "name": name,
            "shipping": shipping,
            "stripe_transaction_id": stripe_transaction_id,
        },
    )

    return response


# TODO: Handle webhook
#       - update transaction record
#       - save id, name, amount, shipping (address, name, phone), status
def handle_webhook(stripe_event, dynamo_client):
    print("\n\n\nStripe event on the next line! :)\n")
    print(stripe_event)

    update_transaction_record_webhook_call(
        transaction_id=stripe_event["transaction_id"],
        name=stripe_event["transaction_id"],
        shipping=stripe_event["transaction_id"],
        status=stripe_event["transaction_id"],
        stripe_transaction_id=stripe_event["transaction_id"],
        dynamo_client=dynamo_client,
    )

    return {
        "code": 200,
        "message": f"Webhook received: {stripe_event}",
    }


def some_hash_algo(client_secret, transaction_salt):
    hashed_secret = hashlib.sha512(
        client_secret.encode("utf-8") + transaction_salt.encode("utf-8")
    ).hexdigest()
    return hashed_secret
