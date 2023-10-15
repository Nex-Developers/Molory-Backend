import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    adminCheck,
    authCheck, 
    langCheck
} from "../../configs/middlewares"
import { getWalletController, patchRechargeWalletController, patchWithdrawWalletController } from "../../controllers/wallet"



export default () => {
    const router = express.Router()
    router.get('/wallet/:id',langCheck, authCheck, adminCheck, expressRouterAdapter(getWalletController))
    router.patch('/recharge-wallet', langCheck, authCheck, adminCheck, expressRouterAdapter(patchRechargeWalletController))
    router.patch('/withdraw-wallet', langCheck, authCheck, adminCheck, expressRouterAdapter(patchWithdrawWalletController))
    return router
}
