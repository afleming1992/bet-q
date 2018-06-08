'use strict';
import * as express from 'express';

// import sub-routers
import * as gameRouter from './game';

let router = express.Router();

router.use('/api/v1/game', gameRouter);

export = router;