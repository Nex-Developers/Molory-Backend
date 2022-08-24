import { Wallet } from "@prisma/client";
import Query from "./query";

export default class WalletDb extends Query<Wallet> {
    constructor() {
        super('wallet')
    }

    // 
}
