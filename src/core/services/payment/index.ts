import { ApiCaller } from "../../../utils/helpers"
import makeCalculPrice from "./calcul-price"
import makeGetPaymentState from "./get-payment-state"

const calculPrice = makeCalculPrice({})
const getPaymentState = makeGetPaymentState({ postData: ApiCaller.send })
export {
    calculPrice,
    getPaymentState
}