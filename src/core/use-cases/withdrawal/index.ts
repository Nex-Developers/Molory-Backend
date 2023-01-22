import { WithdrawalDb } from "../../../db"
import { addCinetpayContacts, checkCinetpayTransfert, cinetpayTransfert } from "../../services/cinetpay"
import { saveProfile } from "../../services/firebase"
import makeList from "./list-items"
import makeAdd from "./add"
import makeConfirm from "./confirm"
import makeListItemInfos from "./list-item-infos"
import makeRemove from "./remove"

const withdrawalDb = new WithdrawalDb()
// const walletDb = new WalletDb()

const addWithdrawal = makeAdd({ addCinetpayContacts, cinetpayTransfert, saveProfile  })
const confirmWithdrawal = makeConfirm({ checkCinetpayTransfert })
const removeWithdrawal = makeRemove({ withdrawalDb })
const listWithdrawals = makeList({ withdrawalDb })
const listWithdrawalInfos = makeListItemInfos({ withdrawalDb })

export {
    addWithdrawal,
    confirmWithdrawal,
    removeWithdrawal,
    listWithdrawals,
    listWithdrawalInfos
}
