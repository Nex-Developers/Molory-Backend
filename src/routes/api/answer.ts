import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    adminCheck, 
    authCheck, 
    langCheck 
} from "../../configs/middlewares"

import { 
    deleteAnswerController,
    getAnswersController,
    patchAnswerController,
    postAnswerController,
} from "../../controllers/answer"

export default () => {
    const router = express.Router()
    router.route('/answer')
    .get(langCheck, authCheck, expressRouterAdapter(getAnswersController))
    .post(langCheck, authCheck, adminCheck, expressRouterAdapter(postAnswerController))
    .patch(langCheck, authCheck, adminCheck, expressRouterAdapter(patchAnswerController))
    .delete(langCheck, authCheck, adminCheck, expressRouterAdapter(deleteAnswerController))
    return router
}