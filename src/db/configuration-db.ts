import { Configuration } from "@prisma/client";
import Query from "./query";

export default class ConfigurationDb extends Query<Configuration> {
    constructor() {
        super('configuration')
    }

    // 
}