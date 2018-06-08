import * as express from 'express';
import { GameController } from '../controllers/GameController';

let router = express.Router();
const gameController = new GameController();

/**
 * Creates a New Game
 */
router.post('/', function(req, res) {
    gameController.createNewGame(req, res);
});

/**
 * Gets a Game
 */
router.get('/:id', (req: express.Request, res: express.Response) => {
    gameController.getGame(req, res);
});

/**
 * Sets/Gets the Current Questions, Category
 */
router.get('/:id/category', (req: express.Request, res: express.Response) => {
    res.send('NOT_IMPLEMENTED');
});

/**
 * Gets the current Question
 */
router.get('/:id/question', (req: express.Request, res: express.Response) => {
    res.send('NOT_IMPLEMENTED');
});

/**
 * Answer a Question
 */
router.post('/:id/answer', (req: express.Request, res: express.Response) => {
    res.send('NOT_IMPLEMENTED');
});

export = router;