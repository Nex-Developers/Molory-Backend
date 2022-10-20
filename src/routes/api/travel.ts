import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    driverCheck, 
    authCheck, 
    langCheck, 
    queryParser
} from "../../configs/middlewares"

import { 
    deleteTravelController,
    getTravelController, 
    getTravelsController,
    // patchConfirmTravelController,
    patchTravelController,
    postNotifyController,
    postTravelController,
} from "../../controllers/travel"

export default () => {
    const router = express.Router()
    router.get('/travel/:id', langCheck, authCheck, expressRouterAdapter(getTravelController))
    router.route('/travel')
    .get(langCheck, queryParser, authCheck, expressRouterAdapter(getTravelsController))
    .post(langCheck, authCheck, expressRouterAdapter(postTravelController))
    .patch(langCheck, authCheck, driverCheck, expressRouterAdapter(patchTravelController))
    .delete(langCheck, authCheck, driverCheck, expressRouterAdapter(deleteTravelController))
    router.post('/confirm-payment', expressRouterAdapter(postNotifyController))
    return router
}