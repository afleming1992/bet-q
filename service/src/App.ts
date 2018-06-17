import * as express from 'express';
import * as bodyParser from 'body-parser';
import normalizePort = require('normalize-port');

import * as routes from './routes';

export class App {
    private app: express.Express;
    private port: number;

    constructor(app: express.Express, port: any) {
        this.app = app;
        this.port = normalizePort(port);
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }

    private configureMiddleware(app: express.Application): void {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
    }

    private configureRoutes(app: express.Application): void {
        app.use(routes);
    }

    public run() {
        this.app.listen(this.port, function() {
            console.log('BetQ Game API : UP');
        });
    }
}