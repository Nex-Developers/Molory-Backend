import { Route } from "@prisma/client";
import Query from "./query";

export default class RouteDb extends Query<Route> {
    constructor() {
        super('route')
    }

    // 
}