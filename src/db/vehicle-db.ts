import { Vehicle } from "@prisma/client";
import Query from "./query";

export default class VehicleDb extends Query<Vehicle> {
    constructor() {
        super('vehicle')
    }

    // 
}