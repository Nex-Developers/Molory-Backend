import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    adminCheck, 
    authCheck, 
    langCheck 
} from "../../configs/middlewares"

import { 
    deletePricingController,
    getPricingController, 
    getPricingsController,
    patchPricingController,
    postPricingController,
} from "../../controllers/pricing"

export default () => {
    const router = express.Router()
    router.get('/pricing/:id', langCheck, authCheck, expressRouterAdapter(getPricingController))
    router.route('/pricing')
    .get(langCheck, authCheck, expressRouterAdapter(getPricingsController))
    .post(langCheck, authCheck, adminCheck, expressRouterAdapter(postPricingController))
    .patch(langCheck, authCheck, adminCheck, expressRouterAdapter(patchPricingController))
    .delete(langCheck, authCheck, adminCheck, expressRouterAdapter(deletePricingController))
    return router
}