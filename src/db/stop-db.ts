import { Stop } from "@prisma/client";
import Query from "./query";

export default class StopDb extends Query<Stop> {
    constructor() {
        super('stop')
    }

    // 
}