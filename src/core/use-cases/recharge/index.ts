import { saveProfile } from "../../services/firebase"
import { notifyUser } from "../../services/notifications"
import { saveTransaction, updateTransaction } from "../../services/transaction"
import makeConfirm from "./confirm"
import makeRequest from "./request"



const requestRecharge = makeRequest({ saveTransaction })
const confirmRecharge = makeConfirm({ updateTransaction, saveProfile, notifyUser })

export {
    requestRecharge,
    confirmRecharge
}
