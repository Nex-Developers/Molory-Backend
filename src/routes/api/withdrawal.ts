import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    authCheck, 
    driverCheck, 
    langCheck 
} from "../../configs/middlewares"

import { 
  getWithdrawalsController,
  postWithdrawalcontroller,
  postConfirmwithdrawalcontroller 
} from "../../controllers/withdrawal"

export default () => {
    const router = express.Router()
    router.route('/withdrawal')
    .get(langCheck, authCheck, driverCheck, expressRouterAdapter(getWithdrawalsController))
    .post(langCheck, authCheck, driverCheck, expressRouterAdapter(postWithdrawalcontroller))
    router.post('/withdrawal-confirmation', expressRouterAdapter(postConfirmwithdrawalcontroller))
    return router
}
