import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    driverCheck, 
    authCheck, 
    fileUpload, 
    langCheck 
} from "../../configs/middlewares"

import { 
    deleteVehicleController,
    getVehicleController, 
    getVehiclesController,
    patchVehicleController,
    postVehicleController,
} from "../../controllers/vehicle"

export default () => {
    const router = express.Router()
    router.get('/vehicle/:id', langCheck, authCheck, expressRouterAdapter(getVehicleController))
    router.route('/vehicle')
    .get(langCheck, authCheck, expressRouterAdapter(getVehiclesController))
    .post(langCheck, authCheck, driverCheck, fileUpload.single('registrationDoc'), expressRouterAdapter(postVehicleController))
    .patch(langCheck, authCheck, driverCheck, expressRouterAdapter(patchVehicleController))
    .delete(langCheck, authCheck, driverCheck, expressRouterAdapter(deleteVehicleController))
    return router
}