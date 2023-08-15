import os
import traceback


########################################################
# Controller Action Handler
########################################################
def handler(event, context):
    try:
        print("Hello world")
    except Exception as e:
        error = {
            "context": str(e),
            "stack": traceback.format_exc(),
        }
        print(f"SERVER_ERROR: Failed to ...: {event} | Encountered error -- {error}")
        return {
            "isAuthorized": False,
            "context": {
                "error": {
                    "message": f"SERVER_ERROR: Failed to parse ...: {event}",
                    "error": error,
                }
            },
        }

    return True
