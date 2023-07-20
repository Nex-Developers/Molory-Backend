import { saveProfile } from "../../services/firebase"
import { saveTransaction, updateTransaction } from "../../services/transaction"
import makeConfirm from "./confirm"
import makeRequest from "./request"



const requestWithdraw = makeRequest({ saveTransaction })
const confirmWithdraw = makeConfirm({ updateTransaction, saveProfile })

export {
    requestWithdraw,
    confirmWithdraw
}
