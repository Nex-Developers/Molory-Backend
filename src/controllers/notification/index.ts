import { 
    setAsSeen, 
    listNotifications,
    publishNotifications, 
} from "../../core/use-cases/notification"
import makeGetItemsController from "./get-items"
import makePatchController from "./patch"
import makePostController from "./post"

const postNotificationController = makePostController({ publishNotifications })
const getNotificationsController = makeGetItemsController({ listNotifications })
const patchNotificationController = makePatchController({ setAsSeen})

export {
    postNotificationController,
    getNotificationsController,
    patchNotificationController
}