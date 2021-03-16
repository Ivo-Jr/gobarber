import 'dotenv/config';

import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';
import routes from './router';
import sentryConfig from './config/sentry';

import './database';

class App {
    constructor() {
        this.server = express();

        Sentry.init(sentryConfig);

        this.middlewares();
        this.routers();
        this.exceptionHandler();
    }

    middlewares() {
        this.server.use(Sentry.Handlers.requestHandler());
        this.server.use(express.json());
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
        );
    }

    routers() {
        this.server.use(routes);
        this.server.use(Sentry.Handlers.errorHandler());
    }

    exceptionHandler() {
        this.server.use(async (erro, request, response, next) => {
            if (process.env.NODE_ENV === 'development') {
                const errors = await new Youch(erro, request).toJSON();

                return response.status(500).json(errors);
            }

            return response
                .status(500)
                .json({ error: 'Internal server error' });
        });
    }
}

export default new App().server;
