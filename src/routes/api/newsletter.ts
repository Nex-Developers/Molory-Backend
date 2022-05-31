import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    adminCheck,
    authCheck, 
    langCheck 
} from "../../configs/middlewares"

import { 
    getNewslettersController,
    postNewsletterController,
} from "../../controllers/newsletter"

export default () => {
    const router = express.Router()
    router.route('/newsletter')
    .get(langCheck, authCheck, adminCheck, expressRouterAdapter(getNewslettersController))
    .post(langCheck, expressRouterAdapter(postNewsletterController))
    return router
}