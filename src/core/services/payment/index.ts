import { ApiCaller, FedapayManager, FirestoreDb } from "../../../utils/helpers"
import makeCalculPrice from "./calcul-price"
import makeGetPaymentState from "./get-payment-state"
import makePay from "./pay"

const calculPrice = makeCalculPrice()
const getPaymentState = makeGetPaymentState({ postData: ApiCaller.send })
const pay = makePay({ createTransaction: FedapayManager.createTransaction, set: FirestoreDb.set})
export {
    calculPrice,
    getPaymentState,
    pay
}
