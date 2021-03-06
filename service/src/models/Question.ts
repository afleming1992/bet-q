import { Answer } from './Answer';
import { attribute } from '@aws/dynamodb-data-mapper-annotations';

export class Question {

    @attribute()
    category: string;

    @attribute()
    question: string;

    @attribute()
    answers: Answer[];

    @attribute()
    correctAnswerId: string;

    getQuestionWithoutCorrectAnswer(): Question {
        const question = this;
        question.correctAnswerId = '';
        return question;
    }

    isCorrectAnswer(selectedAnswerId: string): boolean {
        return selectedAnswerId === this.correctAnswerId;
    }

}