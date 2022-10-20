import { VehicleType } from "@prisma/client";
import Query from "./query";

export default class VehicleTypeDb extends Query<VehicleType> {
    constructor() {
        super('vehicleType')
    }

    // 
}