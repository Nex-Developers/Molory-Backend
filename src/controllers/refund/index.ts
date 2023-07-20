import { addRefund, confirmRefund } from "../../core/use-cases/refund";
import makePostController from "./post";
import makePostConfirmController from "./post-confirm";

const postRefundcontroller = makePostController({ addRefund })
const postConfirmRefundcontroller = makePostConfirmController({ confirmRefund })

export {
    postConfirmRefundcontroller,
    postRefundcontroller,
}