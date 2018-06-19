import * as express from 'express';
import * as bodyParser from 'body-parser';
import normalizePort = require('normalize-port');

import * as routes from './routes';

export class App {
    private app: express.Express;
    private port: number;
    private host: string;

    constructor(app: express.Express, port: any, host: string) {
        this.app = app;
        this.port = port;
        this.host = host;
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
        this.app.listen(this.port, this.host, function() {
            console.log('BetQ Game API : UP');
        });
    }
}