import { PaymentDb } from "../../../db"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"

const paymentDb = new PaymentDb()

const listPayments = makeListItems({ paymentDb })
const listPaymentInfos = makeListItemInfos({ paymentDb })

export {
    listPayments,
    listPaymentInfos
}
