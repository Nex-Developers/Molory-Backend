import { PaymentDb, RouteDb, TravelDb } from "../../../db"
import { saveProfile } from "../../services/firebase"
import { notifyDevice } from "../../services/notifications"
// import { DbConnection } from "../../../utils/helpers"
// import { getPaymentState } from "../../services/payment"
import makeAdd from "./add"
import makeConfirmPayment from "./confirm-payment"
import makeEdit from "./edit"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"
import makeRemove from "./remove"
import makeRateDriver from "./rate-driver"
import makeRatePassenger from "./rate-passenger"

const travelDb = new TravelDb()
const routeDb = new RouteDb()
const paymentDb = new PaymentDb()


const addTravel = makeAdd({ travelDb, routeDb, paymentDb })
const editTravel = makeEdit({ travelDb })
const listTravels = makeListItems({ travelDb })
const listTravelInfos = makeListItemInfos({ travelDb })
const removeTravel = makeRemove({ travelDb, notifyDevice })
const confirmPayment = makeConfirmPayment({ saveProfile })
const rateDriver = makeRateDriver({ saveProfile })
const ratePassenger = makeRatePassenger({ saveProfile })

export {
    addTravel,
    editTravel,
    listTravels,
    listTravelInfos,
    removeTravel,
    confirmPayment,
    rateDriver,
    ratePassenger
}