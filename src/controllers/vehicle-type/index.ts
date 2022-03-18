import { 
    addVehicleType, 
    editVehicleType, 
    listVehicleTypeInfos, 
    listVehicleTypes, 
    removeVehicleType 
} from "../../core/use-cases/vehicle-type"
import makeDeleteController from "./delete"
import makeGetItemController from "./get-item"
import makeGetItemsController from "./get-items"
import makePatchController from "./patch"
import makePostController from "./post"

const postVehicleTypeController = makePostController({ addVehicleType })
const patchVehicleTypeController = makePatchController({ editVehicleType })
const deleteVehicleTypeController = makeDeleteController({ removeVehicleType })
const getVehicleTypesController = makeGetItemsController({ listVehicleTypes })
const getVehicleTypeController = makeGetItemController({ listVehicleTypeInfos })


export {
    postVehicleTypeController,
    patchVehicleTypeController,
    deleteVehicleTypeController,
    getVehicleTypesController,
    getVehicleTypeController
}