import { Question } from '@prisma/client';
import Query from "./query";

export default class QuestionDb extends Query<Question> {
    constructor() {
        super('question')
    }

    // 
}