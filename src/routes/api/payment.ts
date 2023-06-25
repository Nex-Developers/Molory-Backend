import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    adminCheck,
    authCheck, 
    fedapayQueryParser, 
    langCheck
} from "../../configs/middlewares"
import { getConfirmPayment, getPaymentsController, postPaymentController } from "../../controllers/payment"



export default () => {
    const router = express.Router()
    router.route('/payment')
    .get(langCheck, authCheck, adminCheck, expressRouterAdapter(getPaymentsController))
    .post(langCheck, authCheck, expressRouterAdapter(postPaymentController))
    router.get('/validate-payment', langCheck, fedapayQueryParser, expressRouterAdapter(getConfirmPayment))
    return router
}
