import { VehicleDb } from "../../../db"
import makeAdd from "./add"
import makeEdit from "./edit"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"
import makeRemove from "./remove"

const vehicleDb = new VehicleDb()

const addVehicle = makeAdd({ vehicleDb })
const editVehicle = makeEdit({ vehicleDb })
const listVehicles = makeListItems({ vehicleDb })
const listVehicleInfos = makeListItemInfos({ vehicleDb })
const removeVehicle = makeRemove({ vehicleDb })

export {
    addVehicle,
    editVehicle,
    listVehicles,
    listVehicleInfos,
    removeVehicle
}