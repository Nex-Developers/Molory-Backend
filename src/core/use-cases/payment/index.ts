import { PaymentDb } from "../../../db"
import { FedapayManager, FirestoreDb } from "../../../utils/helpers"
import { pay } from "../../services/payment"
import { confirmPayment } from "../travel"
import makeConfirm from "./confirm"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"
import makeRequestPayment from "./request"

const paymentDb = new PaymentDb()

const listPayments = makeListItems({ paymentDb })
const listPaymentInfos = makeListItemInfos({ paymentDb })
const requestPayment = makeRequestPayment({ pay })
const validatePayment = makeConfirm({decriptEvent: FedapayManager.decriptEvent, verifyTransaction: FedapayManager.verifyTransaction, getByDoc: FirestoreDb.getByDoc, updateDoc: FirestoreDb.update, confirmTravel: confirmPayment  })

export {
    listPayments,
    listPaymentInfos,
    requestPayment,
    validatePayment
}
