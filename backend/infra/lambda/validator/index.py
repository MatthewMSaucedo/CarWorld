# NOTE: Return Type
#   As of AWS Lambda Validator V2, the following is an acceptable and expected return format:
#   { isAuthorized: boolean, context: dict }
#   Consequently, this will be the format returned in this lambda function.

import os
import traceback
import jwt

# Environment Variable
JWT_SECRET = os.environ["jwtSecret"]


########################################################
# Controller Action Handler
########################################################
def handler(event, context):
    try:
        # Peel action off of endpoint
        # NOTE: rawPath is of form "/controller/action"
        action = event["rawPath"].split("/")[-1]

        # Grab JWT from header
        encoded_jwt = event["headers"]["authorization"]
    except Exception as e:
        error = {
            "context": str(e),
            "stack": traceback.format_exc(),
        }
        print(
            f"SERVER_ERROR: Failed to parse event into request format: {event} | Encountered error -- {error}"
        )
        return {
            "isAuthorized": False,
            "context": {
                "error": {
                    "message": f"SERVER_ERROR: Failed to parse event into request format: {event}",
                    "error": error,
                }
            },
        }

    try:
        # Validate JWT
        payload = jwt.decode(encoded_jwt, JWT_SECRET, algorithms=["HS256"])

        # Ensure this is indeed an AuthToken, and not a Refresh
        if payload["isRefresh"]:
            raise Exception("Refresh token provided in header, instead of Auth token")
    except Exception as e:
        error = {
            "context": str(e),
            "stack": traceback.format_exc(),
        }
        print(f"SERVER_ERROR: Validator encountered unhandled error -- {error}")
        return {
            "isAuthorized": False,
            "context": {
                "error": {
                    "message": "SERVER_ERROR: Validator encountered unhandled error",
                    "error": error,
                }
            },
        }

    # Successful validation
    result = {
        "isAuthorized": True,
        "context": {
            "action": action,
            "user_id": payload["sub"],
            "user_type": payload["role"],
        },
    }
    print(result)
    return result
