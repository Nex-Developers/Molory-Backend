import { FirestoreDb } from "../../../utils/helpers"
import makeSaveNotification from "./save-notification"
import makeSaveProfile from "./save-profile"
import makeSaveTravel from "./save-travel"
import makeSaveTrip from "./save-trip"

const saveNotification = makeSaveNotification({ addInCollection: FirestoreDb.addInCollection })
const saveProfile = makeSaveProfile({ set: FirestoreDb.set })
const saveTravel = makeSaveTravel({ setInCollection: FirestoreDb.setInCollection})
const saveTrip = makeSaveTrip({ setInCollection: FirestoreDb.setInCollection })

export {
    saveNotification,
    saveProfile,
    saveTravel,
    saveTrip
}
