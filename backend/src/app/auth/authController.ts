import { AuthServiceInterface } from './authServiceInterface';

export class AuthController {
  authService: AuthServiceInterface;

  constructor(authService) {
    this.authService = authService;
  }

  login(req, res) {
    const username = req.username;
    const password = req.password;

    // TODO: Ensure non-empty password

    const loginResponse = this.authService.login(username, password)
    return res.status(loginResponse.code).send(loginResponse)
  }

  register(req, res) {
    const username = req.username;
    const password = req.password;

    // TODO: Ensure non-empty password

    const registerResponse = this.authService.register(username, password)
    return res.status(200).send(registerResponse)
  }
}
