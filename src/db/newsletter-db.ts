import { Newsletter } from "@prisma/client";
import Query from "./query";

export default class NewsletterDb extends Query<Newsletter> {
    constructor() {
        super('newsletter')
    }

    // 
}