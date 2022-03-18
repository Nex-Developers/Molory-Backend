import { Trip } from "@prisma/client";
import Query from "./query";

export default class TripDb extends Query<Trip> {
    constructor() {
        super('trip')
    }

    // 
}