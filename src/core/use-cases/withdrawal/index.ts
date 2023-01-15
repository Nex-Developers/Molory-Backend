import { WithdrawalDb } from "../../../db"
import { addCinetpayContacts, checkCinetpayTransfert, cinetpayTransfert } from "../../services/cinetpay"
import makeList from "../newsletter/list"
import makeAdd from "./add"
import makeConfirm from "./confirm"
import makeListItemInfos from "./list-item-infos"
import makeRemove from "./remove"

const withdrawalDb = new WithdrawalDb()
// const walletDb = new WalletDb()

const addWithdrawal = makeAdd({ addCinetpayContacts, cinetpayTransfert  })
const confirmWithdrawal = makeConfirm({ checkCinetpayTransfert })
const removeWithdrawal = makeRemove({ withdrawalDb })
const listWidrawals = makeList({ withdrawalDb })
const listWidrawalInfos = makeListItemInfos({ withdrawalDb })

export {
    addWithdrawal,
    confirmWithdrawal,
    removeWithdrawal,
    listWidrawals,
    listWidrawalInfos
}
