import { PaymentDb, RouteDb, TravelDb } from "../../../db"
import makeAdd from "./add"
import makeEdit from "./edit"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"
import makeRemove from "./remove"

const travelDb = new TravelDb()
const routeDb = new RouteDb()
const paymentDb = new PaymentDb()


const addTravel = makeAdd({ travelDb, routeDb, paymentDb })
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