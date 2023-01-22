import { addRefund, confirmRefund, listRefunds } from "../../core/use-cases/refund";
import makeGetItemsController from "./get-items";
import makePostController from "./post";
import makePostConfirmController from "./post-confirm";

const postRefundcontroller = makePostController({ addRefund })
const postConfirmRefundcontroller = makePostConfirmController({ confirmRefund })
const getRefundsController = makeGetItemsController({ listRefunds })

export {
    postConfirmRefundcontroller,
    postRefundcontroller,
    getRefundsController
}