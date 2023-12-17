import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    authCheck, 
    langCheck 
} from "../../configs/middlewares"

import { 
    getNotificationsController,
    patchNotificationController,
    postNotificationController,
} from "../../controllers/notification"

export default () => {
    const router = express.Router()
    router.route('/notification')
    .get(langCheck, authCheck, expressRouterAdapter(getNotificationsController))
    .post(langCheck, authCheck, expressRouterAdapter(postNotificationController))
    router.patch('/notification-seen',langCheck, authCheck, expressRouterAdapter(patchNotificationController))
    return router
}