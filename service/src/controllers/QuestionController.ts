import { IQuestionAPI } from './../services/triviaApi/IQuestionAPI';
import { OpenTrivia } from './../services/triviaApi/OpenTrivia';
import { Question } from './../models/Question';
import { AppError } from './../models/AppError';
import { Game } from './../models/Game';

export class QuestionController {
    private questionApi: IQuestionAPI;

    constructor() {
        this.questionApi = new OpenTrivia();
    }

    public async setNewQuestion(game: Game): Promise<Game> {
        try {
            const question: Question = await this.questionApi.getQuestion();
            game.setNextQuestion(question);
            return game;
        } catch (error) {
            throw error;
        }
    }
}