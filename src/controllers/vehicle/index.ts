import { 
    addVehicle, 
    editVehicle, 
    listVehicleInfos, 
    listVehicles, 
    removeVehicle 
} from "../../core/use-cases/vehicle"
import makeDeleteController from "./delete"
import makeGetItemController from "./get-item"
import makeGetItemsController from "./get-items"
import makePatchController from "./patch"
import makePostController from "./post"

const postVehicleController = makePostController({ addVehicle })
const patchVehicleController = makePatchController({ editVehicle })
const deleteVehicleController = makeDeleteController({ removeVehicle })
const getVehiclesController = makeGetItemsController({ listVehicles })
const getVehicleController = makeGetItemController({ listVehicleInfos })


export {
    postVehicleController,
    patchVehicleController,
    deleteVehicleController,
    getVehiclesController,
    getVehicleController
}