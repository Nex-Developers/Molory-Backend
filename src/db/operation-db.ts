import { Operation } from "@prisma/client";
import Query from "./query";

export default class OperationDb extends Query<Operation> {
    constructor() {
        super('operation')
    }

    // 
}