import { listPayments, requestPayment, validatePayment } from "../../core/use-cases/payment"
import makeGetConfirmController from "./get-confirm"
import makeGetItemsController from "./get-items"
import makePostController from "./post"


const getPaymentsController = makeGetItemsController({ listPayments })
const postPaymentController = makePostController({ requestPayment })
const getConfirmPayment = makeGetConfirmController({ validatePayment })
export {
    getPaymentsController,
    postPaymentController,
    getConfirmPayment
}