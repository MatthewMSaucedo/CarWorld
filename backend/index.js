import "reflect-metadata";

const express = require('express');
const carWorldApi= require('./src/CarWorldApi');

const port = 3000;
const app = express();
const carWorldApi = new CarWorldApi(app, port);

// launch application
carWorldApi.run();
