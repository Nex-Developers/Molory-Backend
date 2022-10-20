import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    authCheck, 
    langCheck 
} from "../../configs/middlewares"

import { 
    getConfigurationsController,
    postConfigurationController,
} from "../../controllers/configuration"

export default () => {
    const router = express.Router()
    router.route('/configuration')
    .get(langCheck, authCheck, expressRouterAdapter(getConfigurationsController))
    .post(langCheck, authCheck, expressRouterAdapter(postConfigurationController))
    return router
}