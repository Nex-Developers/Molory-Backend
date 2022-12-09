import { LanguageManager } from "../../../utils/helpers"
import FirebaseAdmin from "../../../utils/helpers/firebase-admin"
import makeNotifyDevice from "./notify-device"

const notifyDevice = makeNotifyDevice({ sendNotification: FirebaseAdmin.sendNotification, translate: LanguageManager.translate })

export {
    notifyDevice
}
