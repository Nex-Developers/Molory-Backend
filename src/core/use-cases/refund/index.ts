import { addCinetpayContacts, checkCinetpayTransfert, cinetpayTransfert } from "../../services/cinetpay";
import { notifyUser } from "../../services/notifications";
import makeAdd from "./add";
import makeConfirm from "./confirm";
import makeList from "./list";

const addRefund = makeAdd({ addCinetpayContacts, cinetpayTransfert})
const listRefunds = makeList()
const confirmRefund =  makeConfirm({ checkCinetpayTransfert, notifyUser })

export {
    addRefund,
    listRefunds,
    confirmRefund
}