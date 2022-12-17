import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    authCheck, 
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
    .post(langCheck, authCheck, expressRouterAdapter(postVehicleController))
    .patch(langCheck, authCheck, expressRouterAdapter(patchVehicleController))
    .delete(langCheck, authCheck, expressRouterAdapter(deleteVehicleController))
    return router
}