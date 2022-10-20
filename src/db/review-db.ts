import { Review } from "@prisma/client";
import Query from "./query";

export default class ReviewDb extends Query<Review> {
    constructor() {
        super('review')
    }

    // 
}