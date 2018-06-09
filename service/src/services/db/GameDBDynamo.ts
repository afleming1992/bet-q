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

    async getGame(id: string): Promise<Game> {
        const game = new Game();
        game.id = id;

        try {
            const response: Game = await this.mapper.get(game);
            return response;
        } catch (error) {
            throw new AppError(AppErrorCode.DBError, error);
        }
    }

    async saveGame(game: Game): Promise<Game> {
        try {
            const response: Game = await this.mapper.put(game);
            return response;
        } catch (error) {
            throw new AppError(AppErrorCode.DBError, error);
        }
    }

    async updateGame(game: Game): Promise<boolean> {
        try {
            await this.mapper.put(game);
            return true;
        } catch (error) {
            throw new AppError(AppErrorCode.DBError, error);
        }
    }

}