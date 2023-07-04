# TODO: Implement (or make use of pre-existing) propper logger, replace #print statements

import os
import json
import traceback
import stripe
import boto3
import hashlib

# Environment Variables
TRANSACTION_SALT = os.environ["transaction_salt"]
SES_CONFIG_ID = os.environ["ses_config_id"]
stripe.api_key = os.environ["stripe_secret"]

# TODO: move these mapping to param store, shouldn't be hardcoded here
# Constants
EMAIL_RECIPIENTS = [
    "themattsaucedo@gmail.com",
    # TODO: uncomment for site-launch
    # "williambanks500@gmail.com",
    # "rkats0524@gmail.com",
]
SES_SENDER_EMAIL = "themattsaucedo@gmail.com"
CLOTHING_TYPE_VALUE = 1
COMMODITY_VALUE_MAP = {
    "save the attendants shirt": 2500,
    "magwadi shirt": 2500,
    "quuarux gas wars shirt": 2500,
    "enter car world shirt": 2500,
    "tat pass bracelet": 6500,
    "quuarux earrings": 3000,
    "car world emblem earrings": 2500,
    "william banks devotional candle": 1200,
    "attendant pendant": 2500,
    "vip pass": 1200,
    "car world supper book": 1000,
    "car world supper book 10 pack": 7000,
    "pamphlet bundle": 1000,
    "car world water": 500,
    "enter car world poster": 3000,
    "the artifact": 800000,
    "devotion point": 100,
}


# TODO: Make this into a lambda layer to be used as a common CWLibrary
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


########################################################
# Controller Action Handler
########################################################
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

    try:
        # direct to proper controller action
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
        elif request["action"] == "ses":
            res = ses_test()
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
    # Validate cart body
    try:
        cart = create_payment_intent_body["cart"]
        for commodity in cart:
            commodity_name = commodity["server_name"]
            quantity = commodity["quantity"]
            type = commodity["type"]

            # Clothing has a size
            if type == CLOTHING_TYPE_VALUE:
                size = commodity["size"]
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

    # Quantify transaction cost
    try:
        amount = calculate_transaction_amount(cart)
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

    # Initiate Payment Intent
    # NOTE:
    #   Car World makes use of the Stripe platform soley to act as a payment processor.
    #   In this asynchronous workflow, Car World must initiate with Stripe a "Payment Intent."
    #   This can be thought of as establishing a valid payment session, for x ammount.
    #   Once initiated, Stripe returns a client secret to be used by the client to engage
    #   in a direct communication to Stripe's servers. Results of this communication
    #   are communicated after-the-fact to Car World via our own subscription to processed
    #   payment events emitted by Stripe.
    try:
        stripe_payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="usd",
            automatic_payment_methods={"enabled": True},
            metadata={"cart": str(cart)},
        )

        client_secret = stripe_payment_intent["client_secret"]
        transaction_id = stripe_payment_intent["id"]
    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(f"SERVER_ERROR: Failed to initiate Stripe Payment Intent | {error}")
        return {
            "code": 500,
            "message": "SERVER_ERROR: Failed to initiate Stripe Payment Intent",
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


def calculate_transaction_amount(cart):
    amount = 0
    for commodity in cart:
        name = commodity["server_name"]
        if name in COMMODITY_VALUE_MAP.keys():
            amount = amount + (COMMODITY_VALUE_MAP[name] * commodity["quantity"])
        else:
            raise Exception(
                f"Invalid commodity name received: {name}, valid names: {COMMODITY_VALUE_MAP.keys()}"
            )
    return amount


# TODO: Replace raw dynamo client call with cw_dynamo_client
def create_transaction_record(
    transaction_id,
    shipping,
    status,
    amount,
    name,
    commodity_list,
    dynamo_client,
    is_guest=True,
):
    dynamo_client = dynamo_client.client

    dynamo_client.put_item(
        TableName="transactions",
        Item={
            "id": {"S": transaction_id},
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
            },
            "tx_status": {"S": status},
            "amount": {"N": str(amount)},
            "customer": {"S": name},
            "commodity_list": {"SS": commodity_list},
            "guest": {"BOOL": is_guest},
        },
    )

    return


def format_commodity_list_from_cart(cart):
    commodity_list = []
    for commodity in cart:
        # prefix quantity as dynamo SS does not allow duplicate entries
        formatted_commodity_name = (
            str(commodity["quantity"]) + "_" + commodity["server_name"]
        )

        # postfix size if applicable
        if commodity["type"] == CLOTHING_TYPE_VALUE:
            size = commodity["size"]
            formatted_commodity_name = formatted_commodity_name + "_" + size

        commodity_list.append(formatted_commodity_name)

    return commodity_list


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

        # Obtain data needed to create record of Transaction
        transaction_id = event_data["id"]
        shipping = event_data["shipping"]
        status = event_data["status"]
        amount = event_data["amount"]
        name = event_data["shipping"]["name"]

        # Get dynamo-friendly commodity list
        # NOTE: use of #eval, as the cart dict is stored as a str on Stripe's end
        cart = eval(event_data["metadata"]["cart"])
        commodity_list = format_commodity_list_from_cart(cart)

        print(f"DEBUG - cart metadata: {event_data['metadata']['cart']}")
        print(f"DEBUG - commodity_list: {commodity_list}")

    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(
            f"SERVER_ERROR: Failed to parse Transaction data from Stripe callback | {error}"
        )
        return {
            "code": 500,
            "message": "SERVER_ERROR: Failed to parse Transaction data from Stripe callback",
            "error": error,
        }

    try:
        # TODO: Once auth is accounted for, override is_guest here if applicable
        transaction_record = create_transaction_record(
            transaction_id=transaction_id,
            shipping=shipping,
            status=status,
            amount=amount,
            name=name,
            commodity_list=commodity_list,
            dynamo_client=dynamo_client,
        )
    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(f"SERVER_ERROR: Failed to create Transaction record | {error}")
        return {
            "code": 500,
            "message": "SERVER_ERROR: Failed to create Transaction record",
            "error": error,
        }

    # NOTE:
    #   This update method would not scale (dynamo atomicity) to scores of concurrent payments.
    #   What a beautiful problem that would be to have one day!
    remove_purchased_commodities_from_stock(commodity_list, dynamo_client)

    try:
        ses_response = send_email_order_details(
            shipping=shipping,
            customer_name=name,
            products=commodity_list,
            amt_in_cents=amount,
        )
        return {"code": 200, "message": ses_response}
    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(f"SERVER_ERROR: Failed to email about commodity purchase | {error}")
        return {
            "code": 500,
            "message": "SERVER_ERROR: Failed to email about commodity purchase",
            "error": error,
        }


def remove_purchased_commodities_from_stock(commodity_list, dynamo_client):
    for purchased_commodity in commodity_list:
        # NOTE: Format is quantity_commodity
        quantity_purchased = purchased_commodity.split("_", 1)[0]
        product_name = purchased_commodity.split("_", 1)[1]

        try:
            old_quantity = dynamo_client.get(
                table_name="commodities",
                key_expression={"product_name": {"S": product_name}},
            )["quantity"]["N"]
            new_quantity = int(old_quantity) - int(quantity_purchased)

            print(
                f"DEBUG - old quantity: {old_quantity} | new_quantity: {new_quantity}"
            )

            dynamo_client.update(
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
                f"SERVER_ERROR: Failed to update quantity of {product_name} record | {error}"
            )

            # NOTE: Queue DynamoDB-Error Retries
            #   This is a very important action. Ecommerce sites, surprisingly, like to know if
            #   they have what it is they are agreeing to sell (this one does, at least).
            #   Consequently, if updating the commodity stock fails, we need to go out of our way
            #   to correct this immediately. Here, we are queueing this up for a retry lambda to
            #   take care of. Suppose dynamo errors persist still, we will at least see a
            #   high-priority lambda begin to alarm immediately.
            queue_cw_db_retry_lambda(
                controller="commerce",
                action="remove_commodity",
                db_actions=[
                    {
                        "operation": "get",
                        "table_name": "commodities",
                        "key_expression": {"product_name": {"S": product_name}},
                    },
                    {
                        "operation": "update",
                        "table_name": "commodities",
                        "key_expression": {"product_name": {"S": product_name}},
                        "field_value_map": {"quantity": new_quantity},
                    },
                ],
            )


def send_email_order_details(shipping, customer_name, products, amt_in_cents):
    ses_client = boto3.client("ses")

    product_table = cw_email_product_table(products)
    customer_shipping = cw_email_format_shipping(shipping)
    dollar_cost = "%0.2f" % (amt_in_cents / 100)
    body_html = f"""
    <html>
        <head></head>
        <body>
        <h1>Car World Store: Order Detail</h1>
        <hr/>
        <p>
            An order in the amount of ${dollar_cost} has been placed by {customer_name}!
        </p>
        {product_table}
        {customer_shipping}
        </body>
    </html>
                    """

    email_message = {
        "Body": {
            "Html": {
                "Charset": "utf-8",
                "Data": body_html,
            },
        },
        "Subject": {
            "Charset": "utf-8",
            "Data": "New Order placed on carworld.love!",
        },
    }

    ses_response = ses_client.send_email(
        Destination={
            "ToAddresses": EMAIL_RECIPIENTS,
        },
        Message=email_message,
        Source=SES_SENDER_EMAIL,
        ConfigurationSetName=SES_CONFIG_ID,
    )

    return f"ses response id: {ses_response['MessageId']} | ses success code: {ses_response['ResponseMetadata']['HTTPStatusCode']}."


def cw_email_product_table(products):
    cw_email_product_table_entries = cw_email_obtain_products_as_td(products)

    table_html = f"""
        <table>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Size</th>
            </tr>
            {cw_email_product_table_entries}
        </table>
    """

    return table_html


def cw_email_obtain_products_as_td(products):
    cw_email_product_table_entries = ""
    for product in products:
        product_details = product.split("_")

        quantity = product_details[0]
        product_name = product_details[1]
        # size, if applicable
        size = product_details[2] if len(product_details) == 3 else ""

        cw_email_product_table_entries += f"""
          <tr>
            <td>{product_name}</td>
            <td>{quantity}</td>
            <td>{size}</td>
          </tr>
        """

    return cw_email_product_table_entries


def cw_email_format_shipping(shipping):
    shipping_html = f"""
      <p>
        {shipping["name"]}
        <br/>
        {shipping["address"]["line1"]}
        <br/>
        {shipping["address"]["line2"]}
        <br/>
        {shipping["address"]["city"]}, {shipping["address"]["state"]} {shipping["address"]["postal_code"]}
        <br/>
        {shipping["address"]["country"]}
        <br/>
        {shipping["phone"]}
      </p>
    """

    return shipping_html


def ses_test():
    ses_client = boto3.client("ses")

    products = ["array product", "another array product"]
    body_html = f"""
    <html>
        <head></head>
        <body>
        <h1>Car World Store: Order Detail</h1>
        <hr/>
        <p>
            stuff would go here!
        </p>
        <p>
            {products}
        </p>
        <p>
            another paragraph
        </p>
        </body>
    </html>
                    """

    email_message = {
        "Body": {
            "Html": {
                "Charset": "utf-8",
                "Data": body_html,
            },
        },
        "Subject": {
            "Charset": "utf-8",
            "Data": "New Order placed on carworld.love!",
        },
    }

    ses_response = ses_client.send_email(
        Destination={
            "ToAddresses": ["themattsaucedo@gmail.com"],
        },
        Message=email_message,
        Source=SES_SENDER_EMAIL,
        ConfigurationSetName=SES_CONFIG_ID,
    )

    return {
        "code": 200,
        "message": f"ses response id received: {ses_response['MessageId']}.",
    }


# TODO: Queues a retry of a particular db write for the CWRetryDatabaseActionLambda
def queue_cw_db_retry_lambda(controller, action, db_actions):
    """"""
