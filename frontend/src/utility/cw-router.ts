/*
 * TODO: Plan out competent Routing.
 * Let's whiteboard/chaklboard(?) this --
 *  <?> Does it make sense to change CarWorldRouter type to map?
 *   *---> closer to doing { cwRouter.navigate('route') }
 *   *---> IMPORTANT: does this support nesting... no? I think?
 *  <?> Do I support routing at all? What am I getting out of this?
 *  <?> I think I was combing effort of AuthService here... nice >:(
 */

import {
  createBrowserRouter,
  Router
} from "react-router-dom"

export default class CarWorldRouter {
  routes: CarWorldRoute[]
  router: Router

  constructor(cwRoutes: CarWorldRoute[]){
    this.routes = routes
    this.initializeRouter(cwRoutes)
  }

  initializeRouter(cwRoutes: CarWorldRoute[]) {
    let reactRoutes: Route
    cwRoutes.forEach((cwRoute) => {
      reactRoutes.concat(cwRoute.reactRoute)
    })
    this.router = createBrowserRouter([reactRoutes])
  }
}

export default class CarWorldRoute {
  title: string
  reactRoute: Route

  constructor(title: string, reactRoute: Route) {
    this.title = title
    this.reactRoute = reactRoute
  }
}
