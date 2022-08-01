import { Payment } from "@prisma/client";
import Query from "./query";

export default class PaymentDb extends Query<Payment> {
    constructor() {
        super('payment')
    }

    // 
}