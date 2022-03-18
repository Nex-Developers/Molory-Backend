import { VehicleTypeDb } from "../../../db"
import makeAdd from "./add"
import makeEdit from "./edit"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"
import makeRemove from "./remove"

const vehicleTypeDb = new VehicleTypeDb()

const addVehicleType = makeAdd({ vehicleTypeDb })
const editVehicleType = makeEdit({ vehicleTypeDb })
const listVehicleTypes = makeListItems({ vehicleTypeDb })
const listVehicleTypeInfos = makeListItemInfos({ vehicleTypeDb })
const removeVehicleType = makeRemove({ vehicleTypeDb })

export {
    addVehicleType,
    editVehicleType,
    listVehicleTypes,
    listVehicleTypeInfos,
    removeVehicleType
}