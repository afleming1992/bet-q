import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        let router = express.Router();
        router.get('/', (req:express.Request, res:express.Response, next:express.RequestHandler) => {
            res.json({
                message: 'Hello world!'
            });
        });
        this.express.use('/', router);
    }
}

export default new App().express;