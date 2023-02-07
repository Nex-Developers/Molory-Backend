import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    authCheck, 
    driverCheck, 
    langCheck, 
    queryParser
} from "../../configs/middlewares"

import { 
    deleteTravelController,
    getTravelController, 
    getTravelsController,
    // patchConfirmTravelController,
    patchTravelController,
    postAskToEndController,
    postAskToStartController,
    postConfirmEnded,
    postConfirmStarted,
    postNotifyController,
    postRateDriverController,
    postRatePassengerController,
    postTravelController,
} from "../../controllers/travel"

export default () => {
    const router = express.Router()
    router.get('/travel/:id', langCheck, authCheck, expressRouterAdapter(getTravelController))
    router.route('/travel')
    .get(langCheck, queryParser, authCheck, expressRouterAdapter(getTravelsController))
    .post(langCheck, authCheck, expressRouterAdapter(postTravelController))
    .patch(langCheck, authCheck, expressRouterAdapter(patchTravelController))
    .delete(langCheck, authCheck, expressRouterAdapter(deleteTravelController))
    router.post('/confirm-payment',langCheck, authCheck,expressRouterAdapter(postNotifyController))
    router.post('/rate-driver',langCheck, authCheck,expressRouterAdapter(postRateDriverController))
    router.post('/rate-passenger',langCheck, authCheck, driverCheck,expressRouterAdapter(postRatePassengerController))
    router.patch('/ask-to-start-travel',langCheck,expressRouterAdapter(postAskToStartController))
    router.patch('/ask-to-end-travel', langCheck,expressRouterAdapter(postAskToEndController))
    router.post('/self-confirm-travel-ended', langCheck, expressRouterAdapter(postConfirmEnded))
    router.post('/confirm-travel-started', langCheck, authCheck, expressRouterAdapter(postConfirmStarted))
    router.post('/confirm-travel-ended', langCheck,authCheck, expressRouterAdapter(postConfirmEnded))
    return router
}