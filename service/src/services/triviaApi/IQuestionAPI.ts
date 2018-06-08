import { Question } from '../../models/Question';
import { AppError } from '../../models/AppError';

export interface IQuestionAPI {
    getQuestion(): Promise<Question | AppError>;
}