import express from 'express';
import routes from './router';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routers();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routers() {
    this.server.use(routes);
  }
}

export default new App().server;
