import { FirestoreDb } from "../../../utils/helpers"
import makeSaveNotification from "./save-notification"
import makeSaveProfile from "./save-profile"


const saveNotification = makeSaveNotification({ addInCollection: FirestoreDb.addInCollection })
const saveProfile = makeSaveProfile({ set: FirestoreDb.set })

export {
    saveNotification,
    saveProfile,
}
