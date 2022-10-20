import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    // driverCheck, 
    authCheck, 
    langCheck, 
    queryParser
} from "../../configs/middlewares"

import { 
    // deleteTripController,
    getRouteController, 
    getRoutesController,
    // patchRouteConfirmController,
    // patchRouteController,
    // postRouteController,
} from "../../controllers/route"

export default () => {
    const router = express.Router()
    router.get('/route/:id', langCheck, authCheck, expressRouterAdapter(getRouteController))
    router.route('/route')
    .get(langCheck, queryParser, authCheck, expressRouterAdapter(getRoutesController))
    // .post(langCheck, authCheck, driverCheck, expressRouterAdapter(postTripController))
    // .patch(langCheck, authCheck, driverCheck, expressRouterAdapter(patchTripController))
    // .delete(langCheck, authCheck, driverCheck, expressRouterAdapter(deleteTripController))
    return router
}