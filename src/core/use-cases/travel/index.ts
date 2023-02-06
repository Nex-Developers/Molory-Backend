import { PaymentDb, RouteDb, TravelDb } from "../../../db"
import { saveProfile, saveTravel, saveTrip } from "../../services/firebase"
import { notifyUser } from "../../services/notifications"
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
import makeAskToStart from "./ask-to-start"
import makeAskToEnd from "./ask-to-end"
import makeConfirmStart from "./confirm-start"
import makeConfirmEnd from "./confirm-end"
import makeSelfConfirmEnd from "./self-confirm-end"
import { addTask } from "../../services/task"

const travelDb = new TravelDb()
const routeDb = new RouteDb()
const paymentDb = new PaymentDb()


const addTravel = makeAdd({ travelDb, routeDb, paymentDb })
const editTravel = makeEdit({ travelDb })
const listTravels = makeListItems({ travelDb })
const listTravelInfos = makeListItemInfos({ travelDb })
const removeTravel = makeRemove({ travelDb, notifyUser, saveTrip, saveTravel })
const confirmPayment = makeConfirmPayment({ addTask, saveProfile, notifyUser, saveTravel, saveTrip })
const rateDriver = makeRateDriver({ saveProfile, notifyUser, saveTravel, saveTrip })
const ratePassenger = makeRatePassenger({ saveProfile, notifyUser, saveTravel, saveTrip })
const askToStart = makeAskToStart({ notifyUser, saveTravel})
const askToEnd = makeAskToEnd({ notifyUser, addTask ,saveTravel })
const confirmStart = makeConfirmStart({ notifyUser, addTask, saveTravel, saveTrip })
const confirmEnd = makeConfirmEnd({ notifyUser, addTask, saveTravel, saveTrip })
const selfConfirmEnd = makeSelfConfirmEnd({ notifyUser, addTask, saveTravel, saveTrip })

export {
    addTravel,
    editTravel,
    listTravels,
    listTravelInfos,
    removeTravel,
    confirmPayment,
    rateDriver,
    ratePassenger,
    askToStart,
    askToEnd,
    confirmStart,
    confirmEnd,
    selfConfirmEnd
}
