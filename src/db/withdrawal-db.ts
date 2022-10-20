import { Withdrawal } from "@prisma/client";
import Query from "./query";

export default class WithdrawalDb extends Query<Withdrawal> {
    constructor() {
        super('withdrawal')
    }

    // 
}
