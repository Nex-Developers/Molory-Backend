import { addCinetpayContacts, checkCinetpayTransfert, cinetpayTransfert } from "../../services/cinetpay";
import { notifyUser } from "../../services/notifications";
import makeAdd from "./add";
import makeConfirm from "./confirm";

const addRefund = makeAdd({ addCinetpayContacts, cinetpayTransfert})
const confirmRefund =  makeConfirm({ checkCinetpayTransfert, notifyUser })

export {
    addRefund,
    confirmRefund
}