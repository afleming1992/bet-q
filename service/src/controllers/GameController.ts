'use strict';
import { Game, GameStatus } from './../models/Game';
import { IGameDB } from './../services/db/IGameDB';
import { GameDBDynamo } from './../services/db/GameDBDynamo';
import { AppError, AppErrorCode } from './../models/AppError';
import { QuestionController } from './QuestionController';

import { Router, Request, Response, NextFunction } from 'express';

export class GameController {
    private db: IGameDB;
    private questionController: QuestionController;

    constructor() {
        this.db = new GameDBDynamo();
        this.questionController = new QuestionController();
    }

    public async createNewGame(): Promise<any> {
        const newGame = new Game();

        newGame.setupNewGame();

        return this.db.saveGame(newGame)
                .then((game: Game) => {
                    const response = {
                        'message': 'Game Created',
                        'id': game.id
                    };
                    return response;
                })
                .catch((error: AppError) => {
                    throw error;
                });
    }

    public async getGame(id: string): Promise<Game> {
        if (id.length !== 36) {
            throw new AppError(AppErrorCode.BadRequest, 'Game ID is not a valid UUID');
        } else {
            try {
                return await this.db.getGame(id);
            } catch (error) {
                throw error;
            }
        }
    }

    public async getCategory(gameId: string) {
        try {
            const game = await this.getGame(gameId);

            if (game.hasCurrentQuestion()) {
                return game.getCategoryResponse();
            } else {
                const updatedGame: Game = await this.questionController.setNewQuestion(game);
                await this.db.updateGame(updatedGame);
                return updatedGame.getCategoryResponse();
            }

        } catch (error) {
            throw error;
        }
    }

    private validateGameState(currentState: GameStatus, requiredState: GameStatus[]): boolean {
        for (let i = 0; i < requiredState.length; i++) {
            if (currentState === requiredState[i]) {
                return true;
            }
        }
        return false;
    }
}