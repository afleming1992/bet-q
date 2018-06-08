import * as uuid from 'uuid';
import { attribute } from '@aws/dynamodb-data-mapper-annotations';

export class Answer {

    @attribute()
    id: string;
    @attribute()
    text: string;

    constructor(id: string, text: string) {
        this.id = id;
        this.text = text;
    }
}