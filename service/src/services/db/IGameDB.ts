'use strict';
import { Game } from './../../models/Game';
import { AppError } from './../../models/AppError';

export interface IGameDB {
    getGame(id: string): Promise<Game | AppError>;
    saveGame(game: Game): Promise<Game | AppError>;
}