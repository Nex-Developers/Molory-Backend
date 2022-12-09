import { 
    setAsSeen, 
    listNotifications, 
} from "../../core/use-cases/notification"
import makeGetItemsController from "./get-items"
import makePostController from "./post"

const postNotificationController = makePostController({ setAsSeen })
const getNotificationsController = makeGetItemsController({ listNotifications })


export {
    postNotificationController,
    getNotificationsController,
}