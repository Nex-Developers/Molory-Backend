import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    driverCheck, 
    authCheck, 
    langCheck, 
    queryParser
} from "../../configs/middlewares"

import { 
    deleteTripController,
    getTripController, 
    getTripsController,
    patchTripConfirmController,
    // patchTripController,
    postTripController,
} from "../../controllers/trip"

export default () => {
    const router = express.Router()
    router.get('/trip/:id', langCheck, authCheck, expressRouterAdapter(getTripController))
    router.route('/trip')
    .get(langCheck, queryParser, authCheck, expressRouterAdapter(getTripsController))
    .post(langCheck, authCheck, driverCheck, expressRouterAdapter(postTripController))
    // .patch(langCheck, authCheck, driverCheck, expressRouterAdapter(patchTripController))
    .delete(langCheck, authCheck, driverCheck, expressRouterAdapter(deleteTripController))
    router.post('/confirm-trip', langCheck, authCheck, driverCheck, expressRouterAdapter(patchTripConfirmController))
    return router
}