import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
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
    .patch(langCheck, authCheck, expressRouterAdapter(patchTravelController))
    .delete(langCheck, authCheck, expressRouterAdapter(deleteTravelController))
    router.post('/confirm-payment',langCheck, authCheck,expressRouterAdapter(postNotifyController))
    return router
}