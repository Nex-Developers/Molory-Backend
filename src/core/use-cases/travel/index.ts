import { PaymentDb, RouteDb, TravelDb } from "../../../db"
import { DbConnection } from "../../../utils/helpers"
import { getPaymentState } from "../../services/payment"
import makeAdd from "./add"
import makeConfirmPayment from "./confirm-payment"
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
const confirmPayment = makeConfirmPayment({ getPaymentState, prisma: DbConnection.prisma })

export {
    addTravel,
    editTravel,
    listTravels,
    listTravelInfos,
    removeTravel,
    confirmPayment
}