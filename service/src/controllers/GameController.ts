'use strict';
import { Game, GameStatus } from './../models/Game';
import { IGameDB } from './../services/db/IGameDB';
import { GameDBDynamo } from './../services/db/GameDBDynamo';
import { AppError, AppErrorCode } from './../models/AppError';
import { QuestionController } from './QuestionController';
import { Question } from './../models/Question';

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
                updatedGame.status = GameStatus.Category;
                await this.db.updateGame(updatedGame);
                return updatedGame.getCategoryResponse();
            }

        } catch (error) {
            throw error;
        }
    }

    public async setBet(gameId: string, betAmount: number) {
        try {
            const game = await this.getGame(gameId);

            if (game.validateGameStatus([GameStatus.Category])) {
               if (game.setBet(betAmount)) {
                    game.status = GameStatus.Question;
                    await this.db.updateGame(game);
                    return {
                        'message': 'Bet Accepted | Question has been unlocked for answering',
                        'score': game.score,
                        'atRisk': game.atRisk
                    };
               } else {
                   throw new AppError(AppErrorCode.BadRequest, `Bets must between 25% of your current score ${game.getMinimumBet()} and your current score ${game.getMaximumBet()}`);
               }
            } else {
                switch (game.status) {
                    case GameStatus.Start:
                    case GameStatus.Answered:
                        throw new AppError(AppErrorCode.BadRequest, 'Bets can not be accepted if there is no current Question. Use the GET /category API to set the next Question');
                    break;
                    case GameStatus.Question:
                        throw new AppError(AppErrorCode.BadRequest, 'Bets can not be changed once you have placed a bet!');
                    break;
                    default:
                        throw new AppError(AppErrorCode.BadRequest, 'Invalid Game State');
                    break;
                }
            }
        } catch (error) {
            throw error;
        }
    }

    public async getQuestion(gameId: string): Promise<Question> {
        try {
            const game = await this.getGame(gameId);

            if (game.validateGameStatus([GameStatus.Question])) {
                return game.currentQuestion.getQuestionWithoutCorrectAnswer();
            } else {
                switch (game.status) {
                    case GameStatus.Start:
                    case GameStatus.Answered:
                        throw new AppError(AppErrorCode.BadRequest, 'No Question is currently set');
                    break;
                    case GameStatus.Category:
                        throw new AppError(AppErrorCode.BadRequest, 'A Bet must be placed before seeing the question');
                    break;
                    default:
                        throw new AppError(AppErrorCode.BadRequest, 'Invalid Game State');
                    break;
                }
            }
        } catch (error) {
            throw error;
        }
    }
}