import { listWalletInfos, rechargeWallet, withdrawWallet } from "../../core/use-cases/wallet";
import makeGetItemController from "./get-item";
import makePatchRechargeController from "./patch-recharge";
import makePatchWithdrawController from "./patch-withdraw";


const getWalletController = makeGetItemController({ listWalletInfos })
const patchRechargeWalletController = makePatchRechargeController({ rechargeWallet })
const patchWithdrawWalletController = makePatchWithdrawController({ withdrawWallet })

export {
    getWalletController,
    patchRechargeWalletController,
    patchWithdrawWalletController
}
