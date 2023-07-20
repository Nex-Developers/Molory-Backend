import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    authCheck, 
    fedapayQueryParser, 
    langCheck
} from "../../configs/middlewares"
import { postConfirmRechargeController, postRechargeController } from "../../controllers/recharge"



export default () => {
    const router = express.Router()
    router.route('/recharge')
    .post(langCheck, authCheck, expressRouterAdapter(postRechargeController))
    router.post('/validate-recharge', langCheck, fedapayQueryParser, expressRouterAdapter(postConfirmRechargeController))
    return router
}
