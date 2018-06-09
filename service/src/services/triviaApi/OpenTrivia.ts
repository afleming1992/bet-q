import { IQuestionAPI } from './IQuestionAPI';
import { Question } from './../../models/Question';
import { Answer } from './../../models/Answer';
import { AppError, AppErrorCode } from './../../models/AppError';

import * as rp from 'request-promise';
import * as uuid from 'uuid';

export class OpenTrivia implements IQuestionAPI {

    API_PATH = 'https://opentdb.com/api.php';

    async getQuestion(): Promise<Question> {
        try {
            return await this.getQuestionFromApi();
        } catch (error) {
            throw error;
        }
    }

    private getQuestionFromApi(): Promise<Question> {
        const options = {
            uri: this.API_PATH,
            qs: {
                amount: 1,
                type: 'multiple'
            },
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };

        return rp(options)
        .then(result => {
            return this.processQuestionResponse(result);
        })
        .catch(error => {
            throw new AppError(AppErrorCode.ApiError, error);
        });
    }

    private processQuestionResponse(questionResponse: any): Question {
        let result: Question = new Question();

        let question = questionResponse.results[0];
        result.category = question.category;
        result.question = question.question;

        const correctAnswer: Answer = new Answer(uuid.v4(), question.correct_answer);

        result.correctAnswerId = correctAnswer.id;

        let incorrectAnswers: Answer[] = [];

        for ( let i = 0; i < question.incorrect_answers.length; i++ ) {
            incorrectAnswers[i] = new Answer(uuid.v4(), question.incorrect_answers[i]);
        }

        result.answers = this.mergeAnswersTogether(correctAnswer, incorrectAnswers);

        return result;
    }

    private mergeAnswersTogether(correctAnswer: Answer, incorrectAnswers: Answer[]): Answer[] {
        let answers: Answer[] = incorrectAnswers;
        answers.push(correctAnswer);
        return this.shuffleAnswers(answers);
    }

    private shuffleAnswers(array: Answer[]): Answer[] {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }

        return array;
    }
}