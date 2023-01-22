import { addWithdrawal, confirmWithdrawal, listWithdrawals } from "../../core/use-cases/withdrawal";
import makeGetItemsController from "./get-items";
import makePostController from "./post";
import makePostConfirmController from "./post-confirm";

const postWithdrawalcontroller = makePostController({ addWithdrawal })
const postConfirmwithdrawalcontroller = makePostConfirmController({ confirmWithdrawal })
const getWithdrawalsController = makeGetItemsController({ listWithdrawals })

export {
    postConfirmwithdrawalcontroller,
    postWithdrawalcontroller,
    getWithdrawalsController
}