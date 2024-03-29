import os
import boto3
import traceback

# Environment Variables
USER_TABLE_NAME = os.environ["user_table_name"]
NUMBER_OF_USERS_RANKED = 20


########################################################
# CWDynamo Client
########################################################
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
        return self.client.scan(TableName=table_name)["Items"]

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

    # Example:
    #   {"N": "991"}, {"S": "art"}, etc
    def unformat_dynamo_value_mapping(self, dynamo_value_mapping):
        dynamo_data_type = next(iter(dynamo_value_mapping.keys()))
        value = next(iter(dynamo_value_mapping.values()))

        if dynamo_data_type == "S":
            return value
        if dynamo_data_type == "N":
            value = float(value)
            return int(value) if value.is_integer() else value
        if dynamo_data_type == "BOOL":
            return bool(value)
        # TODO: Implement
        if dynamo_data_type == "M":
            raise Exception(
                "CWDynamo Client Error: Unpacking of SS type not yet supported"
            )
        # TODO: Implement
        if dynamo_data_type == "SS":
            raise Exception(
                "CWDynamo Client Error: Unpacking of SS type not yet supported"
            )

        # Data type doesn't match an expected value
        raise Exception(
            f"CWDynamo Client Error: Unhandled data type provided: value/type - {value}/{dynamo_data_type}"
        )

    def format_update_expression(self, field_name_list):
        update_expression = f"SET {field_name_list[0]} = :{field_name_list[0]}"
        field_name_list.remove(field_name_list[0])

        for field_name in field_name_list:
            update_expression = update_expression + f", {field_name} = :{field_name}"

        return update_expression


########################################################
# Controller Helper Methods
########################################################
def get_cw_ddp_tier_list_and_rank(user_id, dynamo_client):
    try:
        # NOTE: Dynamo paginates a response after 1MB of data has been retrieved.
        #       Due to the current scale of CW, this is not an issue for us.
        #       HOWEVER, it's very important to note down this intentionality
        #       now while I still remember. Tomorrow's bugs solved by yesterday's
        #       comments :)
        # Retrieve backend list of Users, ranked by DDP
        cw_users = dynamo_client.get_all(USER_TABLE_NAME)
    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(f"SERVER_ERROR: Failed to obtain users from DB -- {error}")
        return {
            "code": 500,
            "message": "SERVER_ERROR: Failed to obtain Commodites from DB",
            "error": error,
        }

    # Sort users by DDP & also obtain formatted User record of the caller
    try:
        sorted_user_list, caller_user = sort_users_descending_ddp(cw_users, user_id)
    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(f"SERVER_ERROR: Failed to sort User records by DDP -- {error}")
        return {
            "code": 500,
            "message": "SERVER_ERROR: Failed to sort User records by DDP",
            "error": error,
        }

    # Determine top x users for tierlist
    try:
        ddp_top_x = ddp_top_x_list_from_users(
            sorted_user_list=sorted_user_list,
            x=NUMBER_OF_USERS_RANKED,
        )
    except Exception as e:
        error = {
            "message": str(e),
            "stack": traceback.format_exc(),
        }
        print(f"SERVER_ERROR: Failed to format sorted User Records for FE -- {error}")
        return {
            "code": 500,
            "message": "SERVER_ERROR: Failed to format sorted User Records for FE",
            "error": error,
        }

    return {
        "code": 200,
        "message": "Successfully retreived ddp data",
        "body": {"ddpTierList": ddp_top_x, "callerUser": caller_user},
    }


# interface CWDdpRank {
#  0  ddp: number,
#  1  userId: number,
#  2  username: string,
#  3  cwNationMember: boolean
#  4  rank: number,
# }
def sort_users_descending_ddp(cw_users, caller_id):
    user_tuple_list = []
    sorted_users = []
    caller_user = None

    for user in cw_users:
        # True if nation member, False otherwise
        cw_nation = user.get("cwNation", {"BOOL": False})["BOOL"]

        user_as_tuple = tuple(
            [
                user["ddp"]["N"],  # tuples are sorted by first element
                user["id"]["S"],
                user["username"]["S"],
                user["referral"]["S"],
                cw_nation,
            ]
        )
        user_tuple_list.append(user_as_tuple)

    # TODO: Refactor this logic to just use a heap of size k,
    #       where k = top k users we are calling for.
    #       Would bring space complexity down to logk.
    sorted_users_tuple_list = sorted(user_tuple_list, reverse=True)
    for rank_zero_idx, user_tuple in enumerate(sorted_users_tuple_list):
        sorted_users.append(
            {
                "ddp": int(user_tuple[0]),
                "userId": user_tuple[1],
                "username": user_tuple[2],
                "referral": user_tuple[3],
                "cwNationMember": user_tuple[4],
                "rank": rank_zero_idx + 1,
            }
        )
        if user_tuple[1] == caller_id:
            caller_user = sorted_users[-1]

    return sorted_users, caller_user


def ddp_top_x_list_from_users(sorted_user_list, x):
    top_x_user_list = []
    for index, user in enumerate(sorted_user_list):
        top_x_user_list.append(user)

        if index == x:
            break

    return top_x_user_list


########################################################
# Controller Action Handler
########################################################
def handler(event, context):
    # Parse request
    try:
        request = {
            "type": event["requestContext"]["http"]["method"],
            "action": event["rawPath"].replace("/profile/", ""),
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

    # Initialize dynamo client
    cw_dynamo_client = CWDynamoClient()

    # Direct to proper controller action
    try:
        if request["action"] == "ddp_rank":
            # Given that this is a protected action, the JWT provided in the header
            # has already been parsed, with the UserID being provided in the reqContext
            try:
                user_id = event["requestContext"]["authorizer"]["lambda"]["user_id"]
            except Exception as e:
                raise Exception("User ID not included from Lambda Authorizer!")

            # Get DDP Tier list AND user's rank
            res = get_cw_ddp_tier_list_and_rank(
                user_id=user_id,
                dynamo_client=cw_dynamo_client,
            )
        else:
            raise Exception(f'Invalid route: {request["action"]}')
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
