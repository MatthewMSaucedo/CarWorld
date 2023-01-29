import { createConnection } from 'typeorm'

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

    this.database_creds = config.database_creds
    this.startDatabase(...this.database_creds)

    return this.app.use(routeConstants.baseApiRoute, router)
  }

  startDatabase(...database_creds: Map<string,string>()) {
    createConnection(database_creds)
  }
}

// TODO: add these to common constants
      // type: '',
      // database: '',
      // username: '',
      // password: '',
      // logging: true
