'use strict';
import { Game, GameStatus } from './../models/Game';
import { IGameDB } from './../services/db/IGameDB';
import { GameDBDynamo } from './../services/db/GameDBDynamo';
import { AppError, AppErrorCode } from './../models/AppError';
import { Router, Request, Response, NextFunction } from 'express';

export class GameController {
    private db: IGameDB;

    constructor() {
        this.db = new GameDBDynamo();
    }

    public createNewGame(req: Request, res: Response) {
        const newGame = new Game();

        newGame.setupNewGame();

        return this.db.saveGame(newGame)
                .then((game: Game) => {
                    const response = {
                        'message': 'Game Created',
                        'id': game.id
                    };
                    res.statusCode = 200;
                    res.send(response);
                })
                .catch((error: AppError) => {
                    res.statusCode = 500;
                    res.send(error);
                });
    }

    public getGame(req: Request, res: Response) {
        const id = req.params.id;
        if (id.length !== 36) {
            res.status(400);
            res.send(new AppError(AppErrorCode.BadRequest, 'Game ID is not a valid UUID'));
        } else {
            this.db.getGame(id)
            .then((game: Game) => {
                res.send(game);
            })
            .catch((error: AppError) => {
                res.send(error);
            });
        }
    }
}