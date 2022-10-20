import { 
    addPreference, 
    editPreference, 
    listPreferenceInfos, 
    listPreferences, 
    removePreference 
} from "../../core/use-cases/preference"
import makeDeleteController from "./delete"
import makeGetItemController from "./get-item"
import makeGetItemsController from "./get-items"
import makePatchController from "./patch"
import makePostController from "./post"

const postPreferenceController = makePostController({ addPreference })
const patchPreferenceController = makePatchController({ editPreference })
const deletePreferenceController = makeDeleteController({ removePreference })
const getPreferencesController = makeGetItemsController({ listPreferences })
const getPreferenceController = makeGetItemController({ listPreferenceInfos })


export {
    postPreferenceController,
    patchPreferenceController,
    deletePreferenceController,
    getPreferencesController,
    getPreferenceController
}