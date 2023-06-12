import { listPayments, requestPayment } from "../../core/use-cases/payment"
import makeGetItemsController from "./get-items"
import makePostController from "./post"


const getPaymentsController = makeGetItemsController({ listPayments })
const postPaymentController = makePostController({ requestPayment })

export {
    getPaymentsController,
    postPaymentController
}