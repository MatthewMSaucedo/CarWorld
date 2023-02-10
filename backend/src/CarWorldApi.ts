import { createConnection } from 'typeorm'
import { SSMClient, GetParameterCommand  } from "@aws-sdk/client-ssm";

const bodyParser = require('body-parser')
const router = require('./routing/router')
const routeConstants = require('./routing/routeConstants')
const config = require('./common/config')

export class CarWorldApi {
  app: any
  port: String

  constructor(app, port) {
    this.app = app
    this.port = port
  }

  run() {
    this.app.listen(
      this.port, () => console.log(`CarWorldApi listening at http://localhost:${this.port}`),
    )
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))

    // AWS Setup
    const awsClients = this.initAwsClients()

    // DB Setup
    this.database_creds = this.fetch_database_creds(awsClients["ssmClient"])
    this.startDatabase(this.database_creds)

    // return setup app with routing
    return this.app.use(routeConstants.baseApiRoute, router)
  }

  initAwsClients() {
    ssmConfig = {
      region: 'us-east-1'
    }
    const ssmClient = new SSMClient(configurarion: ssmConfig);

    return {
      'ssmClient': ssmClient
    }
  }

  fetchDatabaseCreds(ssmClient: SSMClient): Map<string,string> {
    const command = new GetParameterCommand({name: 'db_config'});
    const response = await ssmClient.send(command);
    db_config = JSON.parse(response["Parameter"]["Value"])

    return db_config
  }

  startDatabase(database_creds: Map<string,string>()) {
    createConnection(database_creds)
  }
}

// TODO: db creds in ssm
      // type: '',
      // database: '',
      // username: '',
      // password: '',
      // logging: true
