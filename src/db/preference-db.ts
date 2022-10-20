import { Preference } from "@prisma/client";
import Query from "./query";

export default class PreferenceDb extends Query<Preference> {
    constructor() {
        super('preference')
    }

    // 
}