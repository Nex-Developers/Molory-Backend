import { PreferenceDb } from "../../../db"
import { saveProfile } from "../../services/firebase"
import makeAdd from "./add"
import makeEdit from "./edit"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"
import makeRemove from "./remove"

const preferenceDb = new PreferenceDb()

const addPreference = makeAdd({ preferenceDb, saveProfile })
const editPreference = makeEdit({ preferenceDb })
const listPreferences = makeListItems({ preferenceDb })
const listPreferenceInfos = makeListItemInfos({ preferenceDb })
const removePreference = makeRemove({ preferenceDb })

export {
    addPreference,
    editPreference,
    listPreferences,
    listPreferenceInfos,
    removePreference
}