import { Publication } from "@prisma/client";
import Query from "./query";

export default class PublicationDb extends Query<Publication> {
    constructor() {
        super('publication')
    }

    // 
}