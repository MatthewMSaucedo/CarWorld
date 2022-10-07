import express = require('express');
import './routeConstants';
import { AuthController } from '../auth/AuthController';
import { AuthService } from '../auth/authService';

const authService = new AuthService();
const authController = new AuthController(authService);

const router = express.Router();

router.get(
  routeConstants.authLoginRoute,
  authController.login.bind(authController),
);
