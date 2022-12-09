import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    adminCheck, 
    authCheck, 
    langCheck 
} from "../../configs/middlewares"

import { 
    deletePreferenceController,
    getPreferenceController, 
    getPreferencesController,
    patchPreferenceController,
    postPreferenceController,
} from "../../controllers/preference"

export default () => {
    const router = express.Router()
    router.get('/preference/:id', langCheck, authCheck, expressRouterAdapter(getPreferenceController))
    router.route('/preference')
    .get(langCheck, authCheck, expressRouterAdapter(getPreferencesController))
    .post(langCheck, authCheck, expressRouterAdapter(postPreferenceController))
    .patch(langCheck, authCheck, adminCheck, expressRouterAdapter(patchPreferenceController))
    .delete(langCheck, authCheck, adminCheck, expressRouterAdapter(deletePreferenceController))
    return router
}