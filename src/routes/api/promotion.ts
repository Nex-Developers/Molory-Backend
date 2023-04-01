import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    adminCheck, 
    authCheck, 
    langCheck 
} from "../../configs/middlewares"

import { 
    deletePromotionController,
    getPromotionController,
    getPromotionsController,
    patchPromotionController,
    postPromotionController,
} from "../../controllers/promotion"

export default () => {
    const router = express.Router()
    router.get('/promotion/:name', langCheck, authCheck, expressRouterAdapter(getPromotionController))
    router.route('/promotion')
    .get(langCheck, authCheck, expressRouterAdapter(getPromotionsController))
    .post(langCheck, authCheck, expressRouterAdapter(postPromotionController))
    .patch(langCheck, authCheck, adminCheck, expressRouterAdapter(patchPromotionController))
    .delete(langCheck, authCheck, adminCheck, expressRouterAdapter(deletePromotionController))
    return router
}