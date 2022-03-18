import { TravelDb } from "../../../db"
import makeAdd from "./add"
import makeEdit from "./edit"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"
import makeRemove from "./remove"

const travelDb = new TravelDb()

const addTravel = makeAdd({ travelDb })
const editTravel = makeEdit({ travelDb })
const listTravels = makeListItems({ travelDb })
const listTravelInfos = makeListItemInfos({ travelDb })
const removeTravel = makeRemove({ travelDb })

export {
    addTravel,
    editTravel,
    listTravels,
    listTravelInfos,
    removeTravel
}