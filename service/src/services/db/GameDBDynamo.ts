'use strict';

import { IGameDB } from './IGameDB';
import { Game } from './../../models/Game';
import { AppError, AppErrorCode } from './../../models/AppError';

import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Config, DynamoDB } from 'aws-sdk';

export class GameDBDynamo implements IGameDB {
    mapper: DataMapper;

    constructor() {
        const client = new DynamoDB({region: process.env.AWS_REGION});
        this.mapper = new DataMapper({client});
    }

    async getGame(id: string): Promise<Game | AppError> {
        const game = new Game();
        game.id = id;

        return this.mapper.get(game)
                .then((fetchedGame: Game) => {
                    return fetchedGame;
                })
                .catch(error => {
                    return new AppError(AppErrorCode.ApiError, error);
                });
    }

    async saveGame(game: Game): Promise<Game | AppError> {
        return this.mapper.put(game)
                .then((updatedGame: Game) => {
                    return updatedGame;
                })
                .catch((error: AppError) => {
                    throw new AppError(AppErrorCode.DBError, error);
                });
    }

}