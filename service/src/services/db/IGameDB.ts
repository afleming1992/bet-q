'use strict';
import { Game } from './../../models/Game';
import { AppError } from './../../models/AppError';

export interface IGameDB {
    getGame(id: string): Promise<Game>;
    saveGame(game: Game): Promise<Game>;
    updateGame(game: Game): Promise<boolean>;
}