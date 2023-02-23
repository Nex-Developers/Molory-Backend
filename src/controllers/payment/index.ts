import { listPayments } from "../../core/use-cases/payment"
import makeGetItemsController from "./get-items"


const getPaymentsController = makeGetItemsController({ listPayments })

export {
    getPaymentsController
}