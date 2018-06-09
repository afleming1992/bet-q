import * as express from 'express';
import { GameController } from '../controllers/GameController';
import { Game } from '../models/Game';
import { AppError } from '../models/AppError';

let router = express.Router();

/**
 * Creates a New Game
 */
router.post('/', function(req, res) {
    const gameController = new GameController();

    gameController.createNewGame()
    .then((game: Game) => {
        res.status(200);
        res.send(game);
    })
    .catch((error: AppError) => {
        res.send(error);
    });
});

/**
 * Gets a Game
 */
router.get('/:id', (req: express.Request, res: express.Response) => {
    const gameController = new GameController();
    const id = req.params.id;

    gameController.getGame(id)
    .then((game: Game) => {
        res.status(200);
        res.send(game);
    })
    .catch((error: AppError) => {
        res.send(error);
    });
});

/**
 * Sets/Gets the Current Questions, Category
 */
router.get('/:id/category', (req: express.Request, res: express.Response) => {
    const gameController = new GameController();
    const gameId = req.params.id;

    gameController.getCategory(gameId)
    .then((response) => {
        res.status(200);
        res.send(response);
    })
    .catch((error: AppError) => {
        res.status(500);
        res.send(error);
    });
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