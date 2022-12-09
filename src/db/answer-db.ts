import { Answer } from "@prisma/client";
import Query from "./query";

export default class AnswerDb extends Query<Answer> {
    constructor() {
        super('answer')
    }

    // 
}
