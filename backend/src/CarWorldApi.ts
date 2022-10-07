const bodyParser = require('body-parser');
const router = require('./routing/router');
const routeConstants = require('./routing/routeConstants');

export class CarWorldApi {
  app: any;
  port: String;

  constructor(app, port) {
    this.app = app;
    this.port = port;
  }

  run() {
    this.app.listen(
      this.port, () => console.log(`CarWorldApi listening at http://localhost:${this.port}`),
    );

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    return this.app.use(routeConstants.baseApiRoute, router);
  }
};
