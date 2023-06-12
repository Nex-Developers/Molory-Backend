import { PaymentDb } from "../../../db"
import { pay } from "../../services/payment"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"
import makeRequestPayment from "./request"

const paymentDb = new PaymentDb()

const listPayments = makeListItems({ paymentDb })
const listPaymentInfos = makeListItemInfos({ paymentDb })
const requestPayment = makeRequestPayment({ pay })

export {
    listPayments,
    listPaymentInfos,
    requestPayment
}
