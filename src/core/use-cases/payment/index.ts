import { PaymentDb } from "../../../db"
import makeList from "../newsletter/list"
import makeListItemInfos from "./list-item-infos"

const paymentDb = new PaymentDb()

const listPayments = makeList({ paymentDb })
const listPaymentInfos = makeListItemInfos({ paymentDb })

export {
    listPayments,
    listPaymentInfos
}
