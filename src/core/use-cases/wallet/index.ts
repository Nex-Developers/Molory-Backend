import { saveProfile } from "../../services/firebase";
import { notifyUser } from "../../services/notifications";
import { setTransaction } from "../../services/transaction";
import makeListItem from "./list-item";
import makeRecharge from "./recharge";
import makeWithdraw from "./widraw";


const listWalletInfos = makeListItem()
const rechargeWallet = makeRecharge({ setTransaction, saveProfile, notifyUser})
const withdrawWallet = makeWithdraw({ setTransaction, saveProfile, notifyUser })
export {
    listWalletInfos, 
    rechargeWallet,
    withdrawWallet 
}