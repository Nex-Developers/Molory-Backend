import { VehicleDb } from "../../../db"
import { saveProfile } from "../../services/firebase"
import makeAdd from "./add"
import makeEdit from "./edit"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"
import makeRemove from "./remove"

const vehicleDb = new VehicleDb()

const addVehicle = makeAdd({ vehicleDb, saveProfile })
const editVehicle = makeEdit({ vehicleDb, saveProfile })
const listVehicles = makeListItems({ vehicleDb })
const listVehicleInfos = makeListItemInfos({ vehicleDb })
const removeVehicle = makeRemove({ vehicleDb, saveProfile })

export {
    addVehicle,
    editVehicle,
    listVehicles,
    listVehicleInfos,
    removeVehicle
}