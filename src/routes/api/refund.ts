import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    authCheck, 
    driverCheck, 
    langCheck 
} from "../../configs/middlewares"

import { 
  getRefundsController,
  postConfirmRefundcontroller,
  postRefundcontroller 
} from "../../controllers/refund"

export default () => {
    const router = express.Router()
    router.route('/refund')
    .get(langCheck, authCheck, driverCheck, expressRouterAdapter(getRefundsController))
    .post(langCheck, authCheck, driverCheck, expressRouterAdapter(postRefundcontroller))
    router.route('/refund-confirmation')
    .get((req, res) =>  res.send('success'))
    .post(expressRouterAdapter(postConfirmRefundcontroller))
    return router
}