import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    adminCheck,
    authCheck, 
    langCheck 
} from "../../configs/middlewares"
import { getStatsController, getTransactionsController } from "../../controllers/global"


export default () => {
    const router = express.Router()
    router.route('/transactions').get(langCheck, authCheck, adminCheck, expressRouterAdapter(getTransactionsController))
    router.route('/stats').get(langCheck, authCheck, adminCheck, expressRouterAdapter(getStatsController))
    return router
}