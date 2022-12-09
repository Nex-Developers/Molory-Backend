import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    adminCheck, 
    authCheck, 
    langCheck 
} from "../../configs/middlewares"

import { 
    deleteQuestionController,
    getQuestionsController,
    patchQuestionController,
    postQuestionController,
} from "../../controllers/question"

export default () => {
    const router = express.Router()
    router.route('/question')
    .get(langCheck, authCheck, expressRouterAdapter(getQuestionsController))
    .post(langCheck, authCheck, adminCheck, expressRouterAdapter(postQuestionController))
    .patch(langCheck, authCheck, adminCheck, expressRouterAdapter(patchQuestionController))
    .delete(langCheck, authCheck, adminCheck, expressRouterAdapter(deleteQuestionController))
    return router
}