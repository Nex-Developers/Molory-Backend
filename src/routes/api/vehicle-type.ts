import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    adminCheck, 
    authCheck, 
    langCheck 
} from "../../configs/middlewares"

import { 
    deleteVehicleTypeController,
    getVehicleTypeController, 
    getVehicleTypesController,
    patchVehicleTypeController,
    postVehicleTypeController,
} from "../../controllers/vehicle-type"

export default () => {
    const router = express.Router()
    router.get('/vehicle-type/:id', langCheck, authCheck, expressRouterAdapter(getVehicleTypeController))
    router.route('/vehicle-type')
    .get(langCheck, authCheck, expressRouterAdapter(getVehicleTypesController))
    .post(langCheck, authCheck, adminCheck, expressRouterAdapter(postVehicleTypeController))
    .patch(langCheck, authCheck, adminCheck, expressRouterAdapter(patchVehicleTypeController))
    .delete(langCheck, authCheck, adminCheck, expressRouterAdapter(deleteVehicleTypeController))
    return router
}