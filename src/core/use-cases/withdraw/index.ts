import { saveProfile } from "../../services/firebase"
import { notifyUser } from "../../services/notifications"
import { saveTransaction, updateTransaction } from "../../services/transaction"
import makeConfirm from "./confirm"
import makeRequest from "./request"



const requestWithdraw = makeRequest({ saveTransaction })
const confirmWithdraw = makeConfirm({ updateTransaction, notifyUser, saveProfile })

export {
    requestWithdraw,
    confirmWithdraw
}
