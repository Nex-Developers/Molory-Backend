import { addCinetpayContacts, checkCinetpayTransfert, cinetpayTransfert } from "../../services/cinetpay";
import makeAdd from "./add";
import makeConfirm from "./confirm";
import makeList from "./list";

const addRefund = makeAdd({ addCinetpayContacts, cinetpayTransfert})
const listRefunds = makeList()
const confirmRefund =  makeConfirm({ checkCinetpayTransfert })

export {
    addRefund,
    listRefunds,
    confirmRefund
}