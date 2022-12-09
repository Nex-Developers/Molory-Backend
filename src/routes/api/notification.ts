import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    authCheck, 
    langCheck 
} from "../../configs/middlewares"

import { 
    getNotificationsController,
    postNotificationController,
} from "../../controllers/notification"

export default () => {
    const router = express.Router()
    router.route('/notification')
    .get(langCheck, authCheck, expressRouterAdapter(getNotificationsController))
    router.post('/notification-seen',langCheck, authCheck, expressRouterAdapter(postNotificationController))
    return router
}