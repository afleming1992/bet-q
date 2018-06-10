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
 * Get Min and Max Bets for a Game
 */
router.get('/:id/bet', (req: express.Request, res: express.Response) => {
    const gameController = new GameController();
    const gameId = req.params.id;

    gameController.getMinAndMaxBet(gameId)
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
 * Sets Bet for the current Question
 */
router.post('/:id/bet', (req: express.Request, res: express.Response) => {
    const gameController = new GameController();
    const gameId = req.params.id;
    const betAmount = req.body.bet;

    gameController.setBet(gameId, betAmount)
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
    const gameController = new GameController();
    const gameId = req.params.id;

    gameController.getQuestion(gameId)
    .then((response) => {
        res.status(200);
        res.send(response);
    })
    .catch((error: AppError) => {
        res.status(400);
        res.send(error);
    });
});

/**
 * Answer a Question
 */
router.post('/:id/answer', (req: express.Request, res: express.Response) => {
    const gameController = new GameController();
    const gameId = req.params.id;
    const selectedAnswerId = req.body.answer;

    gameController.answerQuestion(gameId, selectedAnswerId)
    .then((response) => {
        res.status(200);
        res.send(response);
    })
    .catch((error: AppError) => {
        res.status(400);
        res.send(error);
    });
});
export = router;