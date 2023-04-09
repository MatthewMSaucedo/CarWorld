# TODO: Implement (or make use of pre-existing) propper logger, replace #print statements
#
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

TRANSACTION_SALT = os.environ["transaction_salt"]
stripe.api_key = os.environ["stripe_secret"]

# TODO: move this mapping to param store, shouldn't be hardcoded here
COMMODITY_VALUE_MAP = {
    # "name_size"
    "save the attendants shirt_xs": 2500,
    "save the attendants shirt_s": 2500,
    "save the attendants shirt_m": 2500,
    "save the attendants shirt_l": 2500,
    "save the attendants shirt_xl": 2500,
    "magwadi shirt_xs": 2500,
    "magwadi shirt_s": 2500,
    "magwadi shirt_m": 2500,
    "magwadi shirt_l": 2500,
    "magwadi shirt_xl": 2500,
    "quuarux gas wars shirt_xs": 2500,
    "quuarux gas wars shirt_s": 2500,
    "quuarux gas wars shirt_m": 2500,
    "quuarux gas wars shirt_l": 2500,
    "quuarux gas wars shirt_xl": 2500,
    "enter car world shirt_xs": 2500,
    "enter car world shirt_s": 2500,
    "enter car world shirt_m": 2500,
    "enter car world shirt_l": 2500,
    "enter car world shirt_xl": 2500,
}


# TODO: Make this into a lambda layer
class CWDynamoClient:
    client = boto3.client("dynamodb")

    def update(
        self,
        table_name,
        key_expression,
        field_value_map,
        manual_expression_attribute_map=None,
    ):
        update_expression = self.format_update_expression(
            [*field_value_map.keys()]
            + (
                []
                if manual_expression_attribute_map is None
                else [*manual_expression_attribute_map.keys()]
            )
        )

        expression_attribute_values = self.format_update_expression_attribute_values(
            field_value_map, manual_expression_attribute_map, operation="update"
        )

        print(
            f"DEBUG: ExpressionAttributeValues: {expression_attribute_values}\nUpdateExpression: {update_expression}"
        )
        res = self.client.update_item(
            TableName=table_name,
            Key=key_expression,
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
            ReturnValues="UPDATED_NEW",
        )

        return res

    def get(self, table_name, key_expression):
        return self.client.get_item(TableName=table_name, Key=key_expression)["Item"]

    # NOTE: This only works for 1mb of data atm (need to add logic for pagination)
    def get_all(self, table_name):
        self.client.scan(TableName=table_name)["Items"]

    def create(
        self,
        table_name,
        key_expression,
        field_value_map,
        manual_expression_attribute_map=None,
    ):
        # TODO: Roll this block into #format_update_expression_attribute_values
        item = key_expression
        for field_name, field_value in field_value_map.items():
            dynamo_formatted_value_mapping = dynamo_format_value_mapping(
                field_name, field_value, operation="create"
            )
            item.update(dynamo_formatted_value_mapping)
        if manual_expression_attribute_map is not None:
            item.update(manual_expression_attribute_map)

        res = self.client.put_item(TableName=table_name, Item=item)

        return res

    # TODO
    def delete(self, table_name, field_value_map, manual_expression_attribute_map=None):
        """"""

    def format_update_expression_attribute_values(
        self, field_value_map, manual_expression_attribute_map, operation
    ):
        expression_attribute_values = {}
        for field_name, field_value in field_value_map.items():
            dynamo_formatted_value_mapping = self.dynamo_format_value_mapping(
                field_name, field_value, operation=operation
            )
            expression_attribute_values.update(dynamo_formatted_value_mapping)
        if manual_expression_attribute_map is not None:
            if operation == "update":
                # add semicolon to manual_attribute_map keys
                semicolon_manual_expr_attr_map = {}
                for key, value in manual_expression_attribute_map.items():
                    new_key = ":" + key
                    semicolon_manual_expr_attr_map.update({new_key: value})

                expression_attribute_values.update(semicolon_manual_expr_attr_map)
            else:
                expression_attribute_values.update(manual_expression_attribute_map)
        return expression_attribute_values

    def dynamo_format_value_mapping(self, field_name, field_value, operation):
        if operation == "update":
            field_name = ":" + field_name

        dynamoType = self.determine_dynamo_data_type(field_value)

        return {
            field_name: {
                dynamoType: str(field_value)
                if isinstance(field_value, int) or isinstance(field_value, float)
                else field_value
            }
        }

    def determine_dynamo_data_type(self, value):
        if isinstance(value, str):
            return "S"
        elif isinstance(value, bool):
            return "BOOL"
        elif isinstance(value, int) or isinstance(value, float):
            return "N"
        # TODO: Add better Map support - this only works for empty maps
        elif isinstance(value, dict):
            # raise Exception(
            #     'Dynamo Map type ("M") is not currently supported - use manual_expression_attribute_map'
            # )
            return "M"
        # NOTE:
        # We don't support mixed-type lists. Make use
        # of manual_expression_attribute_map if you need that.
        elif isinstance(value, list):
            return "SS" if isinstance(value[0], str) else "NS"
        raise Exception(
            f"CWDynamo Client Error: Unhandled data type provided for value: {value}"
        )

    def format_update_expression(self, field_name_list):
        update_expression = f"SET {field_name_list[0]} = :{field_name_list[0]}"
        field_name_list.remove(field_name_list[0])

        for field_name in field_name_list:
            update_expression = update_expression + f", {field_name} = :{field_name}"

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
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(
            f"SERVER_ERROR: Failed to parse event into request format: {event} | Encountered error -- {error}"
        )
        return {
            "code": 500,
            "message": f"SERVER_ERROR: Failed to parse event into request format: {event}",
            "error": error,
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
        elif request["action"] == "webhook":
            res = handle_webhook(
                stripe_event=request["body"], dynamo_client=cw_dynamo_client
            )
        elif request["action"] == "commodities":
            res = get_commodity_list(dynamo_client=cw_dynamo_client)
    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(f"SERVER_ERROR: Unhandled server error encountered -- {error}")
        return {
            "code": 500,
            "message": "SERVER_ERROR: Unhandled server error encountered",
            "error": error,
        }

    # add headers for CORS
    res["headers"] = {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    }

    return res


def get_commodity_list(dynamo_client):
    try:
        commodities = dynamo_client.get_all("commodities")
    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(f"SERVER_ERROR: Failed to obtain Commodites from DB -- {error}")
        return {
            "code": 500,
            "message": "SERVER_ERROR: Failed to obtain Commodites from DB",
            "error": error,
        }

    return {
        "code": 200,
        "message": "Successfully retreived commodity list",
        "body": {"commodity_list": commodities},
    }


def update_transaction(update_transaction_body, dynamo_client):
    # validate body
    transaction_record_id = ""
    status = ""
    try:
        transaction_record_id = update_transaction_body["transaction_record_id"]
        status = update_transaction_body["tx_status"]
    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(
            f"CLIENT_ERROR: incorrect payload submitted to CWCC /update_transaction: {create_payment_intent_body} | {error}"
        )
        return {
            "code": 400,
            "message": f"CLIENT_ERROR: incorrect payload submitted to CWCC /update_transaction: {create_payment_intent_body}",
            "error": error,
        }

    try:
        transaction_record = update_transaction_record_client_call(
            transaction_record_id, status, dynamo_client
        )
        return {
            "code": 200,
            "message": "updated transaction_record",
        }
    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(f"SERVER_ERROR: failed to update transaction_record | {error}")
        return {
            "code": 500,
            "message": "SERVER_ERROR: failed to update transaction_record",
            "error": error,
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
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(
            f"CLIENT_ERROR: incorrect payload submitted to CWCC /secret: got {create_payment_intent_body}, expected cart of commodities | {error}"
        )
        return {
            "code": 400,
            "message": f"CLIENT_ERROR: incorrect payload submitted to CWCC /secret: got {create_payment_intent_body}, expected cart of commodities",
            "error": error,
        }

    amount = 0
    for commodity in cart:
        client_secret = ""
        try:
            if commodity["name"] in COMMODITY_VALUE_MAP.keys():
                amount = amount + (
                    COMMODITY_VALUE_MAP[commodity["name"]] * commodity["quantity"]
                )
            else:
                raise Exception(
                    f"Invalid commodity name received: {commodity['name']}, valid names: {COMMODITY_VALUE_MAP.keys()}"
                )
        except Exception as e:
            error = {
                "message": str(e),
                "stack": traceback.format_exc(),
            }
            print(f"CLIENT_ERROR: Failed to parse shopping cart: {cart} | {error}")
            return {
                "code": 400,
                "message": f"CLIENT_ERROR: Failed to parse shopping cart: {cart}",
                "error": error,
            }

    try:
        client_secret = stripe.PaymentIntent.create(
            amount=amount,
            currency="usd",
            automatic_payment_methods={"enabled": True},
        ).client_secret
    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print("SERVER_ERROR: Failed to initiate Stripe Payment Intent | {error}")
        return {
            "code": 500,
            "message": "SERVER_ERROR: Failed to initiate Stripe Payment Intent",
            "error": error,
        }

    transaction_id = ""
    try:
        # transaction_id = some_hash_algo(client_secret)
        create_transaction_record(
            cart=cart,
            amount=amount,
            transaction_id=client_secret,
            dynamo_client=dynamo_client,
        )
    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print("SERVER_ERROR: Failed to create Transaction record | {error}")
        return {
            "code": 500,
            "message": "SERVER_ERROR: Failed to create Transaction record",
            "error": error,
        }

    return {
        "code": 200,
        "message": "Succesfully created transaction",
        "body": {
            "client_secret": client_secret,
            "transaction_record_id": transaction_id,
        },
    }


# TODO: Replace raw dynamo client call with cw_dynamo_client
def create_transaction_record(
    cart, amount, transaction_id, dynamo_client, is_guest=True, status="initiated"
):
    dynamo_client = boto3.client("dynamodb")

    # get commodity list
    commodity_list = []
    for commodity in cart:
        # prepend quantity as dynamo SS does not allow duplicate entries
        formatted_commodity_name = str(commodity["quantity"]) + "_" + commodity["name"]
        commodity_list.append(formatted_commodity_name)

    dynamo_client.put_item(
        TableName="transactions",
        Item={
            "id": {"S": transaction_id},
            "commodity_list": {"SS": commodity_list},
            "amount": {"N": str(amount)},
            "guest": {"BOOL": is_guest},
            "tx_status": {"S": status},
            "shipping": {"M": {}},
        },
    )

    return


def update_transaction_record_client_call(transaction_id, status, dynamo_client):
    response = dynamo_client.update(
        table_name="transactions",
        key_expression={"id": {"S": transaction_id}},
        field_value_map={"tx_status": status},
    )
    return response


def update_transaction_record_webhook_call(
    transaction_id, name, shipping, status, stripe_transaction_id, dynamo_client
):
    response = dynamo_client.update(
        table_name="transactions",
        key_expression={"id": {"S": transaction_id}},
        field_value_map={
            "tx_status": status,
            "client_name": str(name or ""),
            "stripe_transaction_id": stripe_transaction_id,
        },
        manual_expression_attribute_map={
            "shipping": {
                "M": {
                    "city": {"S": str(shipping["address"]["city"] or "")},
                    "country": {"S": str(shipping["address"]["country"] or "")},
                    "line1": {"S": str(shipping["address"]["line1"] or "")},
                    "line2": {"S": str(shipping["address"]["line2"] or "")},
                    "postal_code": {"S": str(shipping["address"]["postal_code"] or "")},
                    "us_state": {"S": str(shipping["address"]["state"] or "")},
                    "client_name": {"S": str(shipping["name"] or "")},
                    "phone": {"S": str(shipping["phone"] or "")},
                }
            }
        },
    )

    return response


def handle_webhook(stripe_event, dynamo_client):
    try:
        event = stripe.Event.construct_from(stripe_event, stripe.api_key)
    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(
            f"SERVER_ERROR: Failed to parse Stripe webhook event: {stripe_event} | {error}"
        )
        return {
            "code": 500,
            "message": "SERVER_ERROR: Failed to parse Stripe webhook event",
            "error": error,
        }

    try:
        event_data = event["data"]["object"]
        transaction_id = event_data["client_secret"]

        print(f"WEBHOOK EVENT DATA: {event_data}")

        transaction_record = update_transaction_record_webhook_call(
            # TODO: Email
            transaction_id=transaction_id,
            name=event_data["shipping"]["name"],
            shipping=event_data["shipping"],
            status=event_data["status"],
            stripe_transaction_id=event_data["id"],
            dynamo_client=dynamo_client,
        )
    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(f"SERVER_ERROR: Failed to update existing Transaction record -- {error}")
        return {
            "code": 500,
            "message": "SERVER_ERROR: Failed to create Transaction record",
            "error": error,
        }

    # NOTE:
    #   This update method would not scale (dynamo atomicity) to, say, hundreds of concurrent payments.
    #   What a beautiful problem that would be to have one day.
    print(f'DEBUG -- Transaction Record: {transaction_record["Attributes"]}')
    commodities_in_purchase = transaction_record["Attributes"]["commodity_list"]["SS"]
    remove_purchased_commodities_from_stock(commodities_in_purchase, dynamo_client)

    return {
        "code": 200,
        "message": f"Webhook received: {stripe_event}",
        "for testing": event,
    }


def remove_purchased_commodities_from_stock(commodities_in_purchase, dynamo_client):
    for purchased_commodity in commodities_in_purchase:
        quantity_purchased = purchased_commodity.split("_", 1)[0]
        commodity_name = purchased_item.split("_", 1)[1]

        try:
            old_quantity = dynamo_client.get(
                self,
                table_name="commodities",
                key_expression={"product_name": {"S": product_name}},
            )["quantity"]

            new_quantity = int(old_quantity) - int(quantity_purchased)

            dynamo_client.update(
                self,
                table_name="commodities",
                key_expression={"product_name": {"S": product_name}},
                field_value_map={"quantity": new_quantity},
            )
        except Exception as e:
            error = {
                "message": str(e),
                "stack": traceback.format_exc(),
            }
            print(
                f"SERVER_ERROR: Failed to update quantity of {commodity_name} record \n{error}"
            )
            return {
                "code": 500,
                "message": f"SERVER_ERROR: Failed to update quantity of {commodity_name} record",
                "error": error,
            }


def some_hash_algo(client_secret):
    hashed_secret = hashlib.sha512(
        client_secret.encode("utf-8") + TRANSACTION_SALT.encode("utf-8")
    ).hexdigest()
    return hashed_secret
