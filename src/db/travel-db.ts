import { Travel } from "@prisma/client";
import Query from "./query";

export default class TravelDb extends Query<Travel> {
    constructor() {
        super('travel')
    }

    // 
}