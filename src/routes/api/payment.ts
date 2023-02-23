import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    adminCheck,
    authCheck, 
    langCheck 
} from "../../configs/middlewares"
import { getPaymentsController } from "../../controllers/payment"



export default () => {
    const router = express.Router()
    router.route('/payment')
    .get(langCheck, authCheck, adminCheck, expressRouterAdapter(getPaymentsController))
    return router
}
