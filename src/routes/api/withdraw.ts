import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    authCheck, 
    fedapayQueryParser, 
    langCheck
} from "../../configs/middlewares"
import { postConfirmWithdrawController, postWithdrawController } from "../../controllers/withdraw"



export default () => {
    const router = express.Router()
    router.route('/withdraw')
    .post(langCheck, authCheck, expressRouterAdapter(postWithdrawController))
    router.post('/validate-withdraw', langCheck, fedapayQueryParser, expressRouterAdapter(postConfirmWithdrawController))
    return router
}
