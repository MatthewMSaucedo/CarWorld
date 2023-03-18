exports.handler = async(event) => {
  const { DynamoDBClient, PutItemCommand, QueryCommand } = require("@aws-sdk/client-dynamodb")
  const bcrypt = require('bcrypt')
  const crypto = require('crypto')
  const jwtSecret = process.env.jwtSecret

  async function isValidPassword(password, hash) {
    const result = await bcrypt.compare(password, hash)
    return result
  }

  async function storeInDatabase(dbClient, username, hashedPassword) {
    const putParams = {
      TableName: "users",
      Item: {
        id: { S: crypto.randomUUID() },
        username: { S: username },
        password: { S: hashedPassword },
        type: { S: "standard"}
      }
    }
    const command = new PutItemCommand(putParams)
    await dbClient.send(command)
    return;
  }

  async function getUserByUsername(dbClient, username) {
    const getParams = {
      ExpressionAttributeValues: {
        ":u": { S: username },
      },
      KeyConditionExpression: "username = :u",
      TableName: "users",
      IndexName: "username-lookup-index",
    }
    const command = new QueryCommand(getParams)
    const getRes = await dbClient.send(command)
    console.log(getRes)

    // TODO: Refactor to check Size prop > 0 first
    //       Luckily this doesn't crash when no items present...
    return getRes.Items[0];
  }

  async function registerRequest(request) {
    const dbClient = new DynamoDBClient({ region: "us-east-1" })

    let password = ""
    let username = ""
    try {
      password = request.body.password.toLowerCase()
      username = request.body.username.toLowerCase()
    } catch (error) {
      return {
        code: 500,
        message: error.message,
        error: {
          title: error.name,
          message: error.message,
          stack: error.stack
        }
      }
    }

    let hashedPassword = ""
    try {
      hashedPassword = await bcrypt.hash(password, 10)
    } catch (error) {
      return {
        code: 500,
        message: `Failed to hash password: ${error.message}`,
        error: {
          title: error.name,
          message: error.message,
          stack: error.stack
        }
      }
    }

    let getUserByUsernameRes = null
    try {
      getUserByUsernameRes = await getUserByUsername(dbClient, username)
    } catch (error) {
      return {
        code: 500,
        message: `Failed to lookup supplied username, ${username}, in db: ${error.message}`,
        error: {
          title: error.name,
          message: error.message,
          stack: error.stack
        }
      }
    }

    try {
      if (getUserByUsernameRes) {
        return {
          code: 400,
          message: `The username, ${username}, is unavailable`,
        }
      }
      await storeInDatabase(dbClient, username, hashedPassword)
    } catch (error) {
      return {
        code: 500,
        message: `Failed to store user creds in db: ${error.message}`,
        error: {
          title: error.name,
          message: error.message,
          stack: error.stack
        }
      }
    }

    return {
      code: 200,
      message: `Sucessfully created an account for user: ${username}`,
      body: {
        username: username,
        password: password
      }
    }
  }

  async function loginRequest(request) {
    const dbClient = new DynamoDBClient({ region: "us-east-1" })

    let password = ""
    let username = ""
    try {
      password = request.body.password.toLowerCase()
      username = request.body.username.toLowerCase()
    } catch (error) {
      return {
        code: 500,
        message: error.message,
        error: {
          title: error.name,
          message: error.message,
          stack: error.stack
        }
      }
    }

    let hashedPassword = ""
    try {
      hashedPassword = await bcrypt.hash(password, 10)
    } catch (error) {
      return {
        code: 500,
        message: `Failed to hash password: ${error.message}`,
        error: {
          title: error.name,
          message: error.message,
          stack: error.stack
        }
      }
    }

    let getUserByUsernameRes = null
    try {
      getUserByUsernameRes = await getUserByUsername(dbClient, username)
    } catch (error) {
      return {
        code: 500,
        message: `Failed to lookup supplied username, ${username}, in db: ${error.message}`,
        error: {
          title: error.name,
          message: error.message,
          stack: error.stack
        }
      }
    }
    if (!getUserByUsernameRes) {
      return {
        code: 400,
        message: `No user found with the name: ${username}`,
      }
    }

    let authToken = ""
    try {
      if (await isValidPassword(password, getUserByUsernameRes.password.S)) {
        // TODO: implement
        authToken = await generateAuthToken()
      } else {
        return {
          code: 400,
          message: `Incorrect password supplied for user: ${username}`,
        }
      }
    } catch (error) {
       return {
        code: 500,
        message: `Failed to validate supplied password for ${username}: ${error.message}`,
        error: {
          title: error.name,
          message: error.message,
          stack: error.stack,
        }
      }
    }

    return {
      code: 200,
      message: "Login request succeeded",
      body: { authToken: authToken }
    }
  }

  function refreshRequest(request) {
    return {
      code: 200,
      message: "refresh",
      request: request
    }
  }

  const request = {
    type: event.requestContext.http.method,
    action: event.requestContext.http.path.replace("/auth/", ""),
    body: JSON.parse(event.body)
  }
  let res = ""
  switch(request.action) {
  case "register":
    res = await registerRequest(request)
    break;
  case "login":
    res = await loginRequest(request)
    break;
  case "refresh":
    res = refreshRequest(request)
    break;
  }

  return JSON.stringify(res);
}
