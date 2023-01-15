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
    patchTripController,
    postTripController,
    patchStartTripController,
    patchFinishController
} from "../../controllers/trip"

export default () => {
    const router = express.Router()
    router.get('/trip/:id', langCheck, authCheck, expressRouterAdapter(getTripController))
    router.route('/trip')
    .get(langCheck, queryParser, authCheck, expressRouterAdapter(getTripsController))
    .post(langCheck, authCheck, driverCheck, expressRouterAdapter(postTripController))
    .patch(langCheck, authCheck, driverCheck, expressRouterAdapter(patchTripController))
    .delete(langCheck, authCheck, driverCheck, expressRouterAdapter(deleteTripController))
    router.patch('/trip-start', langCheck, authCheck, driverCheck, expressRouterAdapter(patchStartTripController))
    router.patch('/trip-finish', langCheck, authCheck, driverCheck, expressRouterAdapter(patchFinishController))
    // router.post('/confirm-trip', langCheck, authCheck, driverCheck, expressRouterAdapter(patchConfirmController))
    return router
}