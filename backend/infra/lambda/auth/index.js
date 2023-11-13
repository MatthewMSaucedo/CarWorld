// Declarations
const { DynamoDBClient, PutItemCommand, QueryCommand } = require("@aws-sdk/client-dynamodb")
const { GetCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { nanoid } = require('nanoid')

// Environment Variables
const JWT_SECRET = process.env.jwtSecret
const JWT_EXPIRATION_TIME_IN_MINUTES = process.env.jwtExpMinutes
const USER_TABLE_NAME = process.env.userTableName
const INVALID_TOKEN_TABLE_NAME = process.env.invalidTokenTableName
const MONTH_IN_MINUTES = "43200"

const dbClient = new DynamoDBClient({ region: "us-east-1" })

/************************************************************************#
|                    Car World Auth Helpers
#************************************************************************/
async function isValidPassword(password, hash) {
  const result = await bcrypt.compare(password, hash)
  return result
}

async function storeNewUserInDatabase(dbClient, username, hashedPassword, email, referralCode, ddp) {
  let userItem = {
    id: { S: crypto.randomUUID() },
    username: { S: username },
    password: { S: hashedPassword },
    email: { S: email },
    type: { S: "standard" },
    referral: { S: referralCode },
    joined: { S: new Date().toDateString() },
    ddp: { N: ddp.toString() },
    cwNation: { BOOL: false }
  }

  const putParams = {
    TableName: USER_TABLE_NAME,
    Item: userItem
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
    TableName: USER_TABLE_NAME,
    IndexName: "username-lookup-index"
  }
  const command = new QueryCommand(getParams)
  const getRes = await dbClient.send(command)
  console.log(getRes)

  // TODO: Refactor to check Size prop > 0 first
  //       Luckily this doesn't crash when no items present...
  return getRes.Items[0]
}

async function getUserByReferralCode(dbClient, referral) {
  const getParams = {
    ExpressionAttributeValues: {
      ":r": { S: referral }
    },
    KeyConditionExpression: "referral = :r",
    TableName: USER_TABLE_NAME,
    IndexName: "referral-lookup-index"
  }
  const command = new QueryCommand(getParams)
  const getRes = await dbClient.send(command)

  // TODO: Refactor to check Size prop > 0 first
  //       Luckily this doesn't crash when no items present...
  console.log(getRes.Items[0])
  return getRes.Items[0]
}

async function awardUserDDP(dbClient, userId, ddp) {
  const updateParams = {
    TableName: USER_TABLE_NAME,
    Key: { "id": userId },
    UpdateExpression: "set ddp = :d",
    ExpressionAttributeValues: {
      ":d": ddp
    }
  }
  const command = new UpdateCommand(updateParams)
  const updateRes = await dbClient.send(command)
  console.log(updateRes)
}

function validateLoginRequestInput(requestBody) {
  // Valitdate username
  const username = requestBody.username
  if (typeof username !== 'string' || username.length < 4 || username.length > 64) {
    throw new Error(`Provided username failed to validate: ${username}`)
  }

  // Valitdate password
  const password = requestBody.password
  if (typeof password !== 'string' || password.length < 6 || password.length > 64 || password.includes(" ")) {
    // NOTE: Do NOT specify the password used, for security
    throw new Error("Provided password failed to validate")
  }

  return true
}

function validateRegisterRequestInput(requestBody) {
  // Validate username and password
  validateLoginRequestInput(requestBody)

  // Valitdate email
  const email = requestBody.email
  if (typeof email !== 'string' || email.length < 6 || email.length > 84 || email.includes(" ")) {
    throw new Error(`Provided email failed to validate: ${email}`)
  }

  return true
}

async function registerRequest(request, dbClient) {
  // Validate input
  try {
    validateLoginRequestInput(request.body)
    validateRegisterRequestInput(request.body)
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
  const email = request.body.email.toLowerCase()
  const suppliedReferralCode = request.body?.referralCode

  // Hash password
  let hashedPassword = ""
  try {
    hashedPassword = await bcrypt.hash(password, 10)
  } catch (error) {
    return {
      code: 500,
      message: `SERVER_ERROR: Failed to hash password: ${error.message}`,
      error: {
        title: error.name,
        message: error.message,
        stack: error.stack
      }
    }
  }

   // Verify referral code if given, and award referrer DDP
  let ddpAward = 0
  try {
    if (suppliedReferralCode) {
      referralSuccess = await processReferralCode(dbClient, suppliedReferralCode)
      if (referralSuccess) {
        ddpAward = 3
      }
    }
  } catch (error) {
    console.log(`SERVER_ERROR: Failed to process Referral Code | ${error}`)
  }

  // Check if requested username is available
  let getUserByUsernameRes = null
  try {
    getUserByUsernameRes = await getUserByUsername(dbClient, username)

    if (getUserByUsernameRes) {
      return {
        code: 400,
        message: `The username, ${username}, is unavailable`
      }
    }
  } catch (error) {
    return {
      code: 500,
      message: `SERVER_ERROR: Failed to lookup supplied username, ${username}, in db: ${error.message}`,
      error: {
        title: error.name,
        message: error.message,
        stack: error.stack
      }
    }
  }

  // Generate referral code for user (maybe not async?)
  referralCode = generateReferralCode()

  // Store new user in DB
  try {
    await storeNewUserInDatabase(dbClient, username, hashedPassword, email, referralCode, ddpAward)
  } catch (error) {
    return {
      code: 500,
      message: `SERVER_ERROR: Failed to store user creds in db: ${error.message}`,
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
    }
  }
}

async function processReferralCode(dbClient, suppliedReferralCode) {
  // Obtain user by referral code
  let referrer = null
  try {
    referrer = await getUserByReferralCode(dbClient, suppliedReferralCode)
  } catch (error) {
    console.log(`SERVER_WARN: Failed to grab user by supplied referralCode: ${error}`)
    return false
  }

  // Award DDP to referrer
  const newDDP = 5 + Number(referrer.ddp.N)
  console.log(`Awarding 5 DDP to user${referrer.id.S} | new DDP total: ${newDDP}`)
  try {
    await awardUserDDP(dbClient, referrer.id.S, newDDP)
  } catch (error) {
    console.log(`SERVER_ERROR: Failed to award referrer:${referrer.id.S} with DDP: ${error}`)
    return false
  }

  return true
}

function generateReferralCode() {
    return nanoid(10)
}

async function loginRequest(request, dbClient) {
  console.log("DEBUG -- Entered Login Request")

  // Validate input
  try {
    validateLoginRequestInput(request.body)
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
        "type": "auth"
      }
      const refreshClaims = {
        "jti": crypto.randomUUID(),
        "sub": getUserByUsernameRes.id.S,
        "role": getUserByUsernameRes.type.S,
        "type": "refresh"
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
          username: getUserByUsernameRes.username.S,
          userType: getUserByUsernameRes.type.S,
          ddp: getUserByUsernameRes.ddp.N,
          joined: getUserByUsernameRes.joined.S,
          tokens: jwtTokens,
          referral: getUserByUsernameRes.referral.S
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

async function refreshRequest(request, dbClient) {
  console.log("DEBUG -- Entered Refresh Request")

  // Validate input
  let refreshToken
  try {
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
  console.log(`DEBUG -- Refresh Token jti/sub/role/type: ${refreshToken.jti}/${refreshToken.sub}/${refreshToken.role}/${refreshToken.type}`)

  try {
    // Assign claims (payload)
    const authClaims = {
      "jti": crypto.randomUUID(),
      "sub": refreshToken.sub,
      "role": refreshToken.role,
      "type": 'auth'
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
  const decodedRefreshToken = jwt.verify(refreshToken, JWT_SECRET)

  // Check against InvalidTokenCache
  const tokenIsBlacklisted = await tokenInInvalidCache(decodedRefreshToken.jti, dbClient)
  if (tokenIsBlacklisted) {
    const illegalAccessError = 'Provided Token has been Blacklisted. The United Nations has been notified and will convene shortly.'
    console.log(illegalAccessError)
    throw new Error(illegalAccessError)
  }

  // Ensure the token is, indeed, a refresh token
  if (decodedRefreshToken.type !== "refresh") {
    const incorrectTokenTypeError = 'Provided Token is not a refresh token'
    console.log(incorrectTokenTypeError)
    throw new Error(incorrectTokenTypeError)
  }

  return decodedRefreshToken
}

function guestRequest(request) {
  try {
    // Assign claims (payload)
    const guestClaims = {
      "jti": crypto.randomUUID(),
      "sub": "guest",
      "role": "guest",
      "type": "guest"
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
    TableName: INVALID_TOKEN_TABLE_NAME,
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
exports.handler = async(event) => {
  // Unpack request
  let request = ""
  try {
    request = {
      type: event.requestContext.http.method,
      action: event.requestContext.http.path.replace("/auth/", ""),
    }

    // Guest req has no body
    request.body = request.action != "guest" ? JSON.parse(event.body) : {}
  } catch (error) {
      return {
        code: 500,
          message: `Received request with invalid format - ${event.body} | ${event.requestContext}`,
          error: {
            title: error.name,
            message: error.message,
            stack: error.stack
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
      res = await registerRequest(request, dbClient)
      break
    // Login existing user
    case "login":
      console.log("login")
      res = await loginRequest(request, dbClient)
      console.log("Login Request completed")
      break
    // Refresh authtoken
    case "refresh":
      console.log("refresh")
      res = await refreshRequest(request, dbClient)
      break
    // Generate guest authtoken
    case "guest":
      console.log("refresh")
      res = guestRequest(request)
      break
  }

  return JSON.stringify(res)
}
