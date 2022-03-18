import { Pricing } from "@prisma/client";
import Query from "./query";

export default class PricingDb extends Query<Pricing> {
    constructor() {
        super('pricing')
    }

    // 
}