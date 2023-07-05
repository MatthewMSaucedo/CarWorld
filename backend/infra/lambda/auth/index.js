exports.handler = async(event) => {
  // Declarations
  const { DynamoDBClient, PutItemCommand, QueryCommand } = require("@aws-sdk/client-dynamodb")
  const { GetCommand } = require("@aws-sdk/lib-dynamodb")
  const bcrypt = require('bcrypt')
  const crypto = require('crypto')
  const jwt = require('jsonwebtoken')

  // Environment Variables
  const JWT_SECRET = process.env.jwtSecret
  const JWT_EXPIRATION_TIME_IN_MINUTES = process.env.jwtExpMinutes
  const MONTH_IN_MINUTES = "43200"

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
    return
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
    return getRes.Items[0]
  }

  function validateCredentialRequestInput(requestBody) {
    // Valitdate username
    const username = requestBody.username
    if (typeof username !== 'string' || username.length < 1 || username.length > 16 || username.includes(" ")) {
      throw new Error(`Provided username failed to validate: ${username}`)
    }

    // Valitdate password
    const password = requestBody.password
    if (typeof password !== 'string' || password.length < 1 || password.length > 16 || password.includes(" ")) {
      // NOTE: Do NOT specify the password used, for security
      throw new Error("Provided password failed to validate")
    }

    return true
  }

  async function registerRequest(request) {
    const dbClient = new DynamoDBClient({ region: "us-east-1" })

    // Validate input
    try {
      validateCredentialRequestInput(request.body)
    } catch (error) {
      return {
        code: 400,
        message: `Payload failed to validate: ${error.message}`,
        error: {
          title: error.name,
          message: error.message,
          stack: error.stack
        }
      }
    }

    // Obtain user input
    const password = request.body.password.toLowerCase()
    const username = request.body.username.toLowerCase()

    // Hash password
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

    // Check if requested username is available
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

      // Store new user in DB
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

    // 200 Success
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
    console.log("DEBUG -- Entered Login Request")

    // Validate input
    try {
      validateCredentialRequestInput(request.body)
    } catch (error) {
      return {
        code: 400,
        message: `Payload failed to validate: ${error.message}`,
        error: {
          title: error.name,
          message: error.message,
          stack: error.stack
        }
      }
    }

    // Obtain user input
    const password = request.body.password.toLowerCase()
    const username = request.body.username.toLowerCase()

    // Hash password
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

    // TODO:(Banning Users)
    //       Were the ability to ban users added, it would require
    //       a simple check of a new User bool property, isBanned.
    //       No other additions would be required, as once banned their
    //       refresh tokens would also be added to the InvalidTokenCache.
    //       This would ensure that upon banning a user, they could not rely
    //       on a window of time wherein they still had a valid refresh token.
    //
    // Obtain User requested, or reject if no such user exists
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

    // Validate Password against User record
    let isValid = false
    try {
      console.log("DEBUG -- Attempting to validate password...")
      isValid = await isValidPassword(password, getUserByUsernameRes.password.S)
      console.log("DEBUG -- Succeeded in password validation")
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

    // Return authtoken and refresh for valid requests, otherwise reject
    if (isValid) {
      try {
        // Assign claims (payload)
        const authClaims = {
          "jti": crypto.randomUUID(),
          "sub": getUserByUsernameRes.id.S,
          "role": getUserByUsernameRes.type.S,
          "isRefresh": false
        }
        const refreshClaims = {
          "jti": crypto.randomUUID(),
          "sub": getUserByUsernameRes.id.S,
          "role": getUserByUsernameRes.type.S,
          "isRefresh": true
        }

        // Generate signed JWTs
        const jwtTokens = {
          auth: generateJwtToken(authClaims, JWT_EXPIRATION_TIME_IN_MINUTES),
          refresh: generateJwtToken(refreshClaims, MONTH_IN_MINUTES)
        }
        console.log("DEBUG -- Authtokens generated")
        return {
          code: 200,
          message: "Login request succeeded",
          body: {
            tokens: jwtTokens
          }
        }
      } catch (error) {
        console.log(error)
        return {
          code: 500,
          message: `Failed to generate auth token: ${error.message}`,
          error: {
            title: error.name,
            message: error.message,
            stack: error.stack
          }
        }
      }
    } else {
      return {
        code: 400,
        message: `Incorrect password supplied for user: ${username}`
      }
    }
  }

  function generateJwtToken(claims, exp_time) {
    const expireTime = `${exp_time} Minutes`
    console.log(`DEBUG -- exp: ${expireTime}`)

    // Generate and sign AuthToken
    const jwtToken = jwt.sign(
      claims,
      JWT_SECRET,
      { expiresIn: expireTime }
    )

    return jwtToken
  }

  async function refreshRequest(request) {
    console.log("DEBUG -- Entered Refresh Request")
    const dbClient = new DynamoDBClient({ region: "us-east-1" })

    // Validate input
    let refreshToken
    try {
      // TODO: Add check for isRefresh
      refreshToken = await validateRefreshRequestInput(request.body, dbClient)
    } catch (error) {
      // Client should redirect user to login
      return {
        code: 401,
        message: `Payload failed to validate: ${error.message} -- new login required`,
        error: {
          title: error.name,
          message: error.message,
          stack: error.stack
        }
      }
    }
    console.log(`DEBUG -- Refresh Token jti/sub/role/isRefresh: ${refreshToken.jti}/${refreshToken.sub}/${refreshToken.role}/${refreshToken.isRefresh}`)

    try {
      // Assign claims (payload)
      const authClaims = {
        "jti": crypto.randomUUID(),
        "sub": refreshToken.sub,
        "role": refreshToken.role,
        "isRefresh": false
      }

      // Generate signed JWT
      const jwtTokens = {
        auth: generateJwtToken(authClaims, JWT_EXPIRATION_TIME_IN_MINUTES),
        refresh: request.body.refreshToken
      }
      return {
        code: 200,
        message: "Refresh request succeeded",
        body: {
          tokens: jwtTokens
        }
      }
      console.log("DEBUG -- Authtoken generated")
    } catch (error) {
      return {
        code: 500,
        message: `Failed to generate auth token: ${error.message}`,
        error: {
          title: error.name,
          message: error.message,
          stack: error.stack
        }
      }
    }
  }

  async function validateRefreshRequestInput(requestBody, dbClient) {
    // Sanitize refreshToken
    const refreshToken = requestBody.refreshToken
    if (
      typeof refreshToken !== 'string' ||
      refreshToken.length < 25 ||
      refreshToken.includes(" ")
    ) {
      throw new Error('Provided RefreshToken was illegally formatted')
    }

    // Verify refresh token
    // NOTE: This will throw if validation fails, bubbling up to the caller
    const decodedToken = jwt.verify(refreshToken, JWT_SECRET)

    // Check against InvalidTokenCache
    const tokenIsBlacklisted = await tokenInInvalidCache(decodedToken.jti, dbClient)
    if (tokenIsBlacklisted) {
      const illegalAccessError = 'Provided Token has been Blacklisted. The United Nations has been notified and will convene shortly.'
      console.log(illegalAccessError)
      throw new Error(illegalAccessError)
    }

    // Ensure the token is, indeed, a refresh token
    if (!decodedToken.isRefresh) {
      const incorrectTokenTypeError = 'Provided Token is not a refresh token'
      console.log(incorrectTokenTypeError)
      throw new Error(incorrectTokenTypeError)
    }

    return decodedToken
  }

  function guestRequest(request) {
    try {
      // Assign claims (payload)
      const guestClaims = {
        "sub": "guest",
        "role": "guest",
        "isRefresh": false
      }

      // Generate guest JWT
      const guestToken = generateJwtToken(guestClaims, JWT_EXPIRATION_TIME_IN_MINUTES)
      console.log("DEBUG -- GuestToken generated")
      return {
        code: 200,
        message: "Guest request succeeded",
        body: {
          guestToken: guestToken
        }
      }
    } catch (error) {
      return {
        code: 500,
        message: `Failed to generate guest token: ${error.message}`,
        error: {
          title: error.name,
          message: error.message,
          stack: error.stack
        }
      }
    }
  }

  // NOTE: This makes use of a Dynamo table to store invalid tokens.
  //       The ttl of this table is 43200 -- our refresh token ttl
  //       is also 43200. This ensures that any invalid token
  //       will appear in this table for as long as it would be
  //       otherwise valid.
  //
  //       This might make more sense as a redis/elasticache node as
  //       opposed to a dynamo table - but when accounting for cost
  //       and scale, dynamo has been chosen at this time.
  async function tokenInInvalidCache(refreshTokenJti, dbClient) {
    // Lookup token in InvalidCache
    console.log(`DEBUG -- Checking to see if token jti, ${refreshTokenJti}, is invalid`)
    const getParams = {
      TableName: "invalid_tokens",
      Key: {
        jti: refreshTokenJti
      }
    }
    const command = new GetCommand(getParams)
    const getRes = await dbClient.send(command)
    console.log("testing....")
    console.log(getRes)

    // If undefined, token is not present
    return getRes.Item === undefined ? false : true
  }

/************************************************************************#
|                    Car World Auth Controller
#************************************************************************/
  // Unpack request
  let request = ""
  try {
    request = {
      type: event.requestContext.http.method,
      action: event.requestContext.http.path.replace("/auth/", ""),
      body: JSON.parse(event.body)
    }
  } catch (error) {
      return {
        code: 500,
          message: `Received request with invalid format - ${event.body} | ${event.requestContext}`,
          error: {
            title: error.name,
            message: error.message,
            stack: error.stack,
          }
      }
  }

  // Route request to relevant action
  let res = ""
  console.log(request.action)
  switch(request.action) {
    // Register new user
    case "register":
      console.log("register")
      res = await registerRequest(request)
      break
    // Login existing user
    case "login":
      console.log("login")
      res = await loginRequest(request)
      console.log("Login Request completed")
      break
    // Refresh authtoken
    case "refresh":
      console.log("refresh")
      res = await refreshRequest(request)
      break
    // Generate guest authtoken
    case "guest":
      console.log("refresh")
      res = guestRequest(request)
      break
  }

  return JSON.stringify(res)
}
