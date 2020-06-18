import express from 'express';
import Routes from '../routes';
import '../database';

class App {
  constructor() {
    this.app = express();

    this.Middleware();
    this.Routes();
  }

  Middleware() {
    this.app.use(express.json());
  }

  Routes() {
    this.app.use(Routes);
  }
}

export default new App().app;
