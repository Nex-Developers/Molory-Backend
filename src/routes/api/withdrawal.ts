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
    router.route('/withdrawal-confirmation')
    .get((req, res) =>  res.send('success') )
    .post(expressRouterAdapter(postConfirmwithdrawalcontroller))
    return router
}
