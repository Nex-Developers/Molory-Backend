import { FirestoreDb, LanguageManager } from "../../../utils/helpers"
import FirebaseAdmin from "../../../utils/helpers/firebase-admin"
import makeNotifyDevice from "./notify-device"
import makeNotifyUser from "./notify-user"

const notifyDevice = makeNotifyDevice({ sendNotification: FirebaseAdmin.sendNotification, translate: LanguageManager.translate })
const notifyUser = makeNotifyUser({ sendNotification: FirebaseAdmin.sendNotification, addInCollection: FirestoreDb.addInCollection, translate: LanguageManager.translate })
export {
    notifyDevice,
    notifyUser
}
