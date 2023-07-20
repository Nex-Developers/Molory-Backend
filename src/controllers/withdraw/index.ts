import { confirmWithdraw, requestWithdraw } from "../../core/use-cases/withdraw";
import makePostConfirmController from "./confirm";
import makePostController from "./post";

const postWithdrawController = makePostController({ requestWithdraw })
const postConfirmWithdrawController = makePostConfirmController({ confirmWithdraw })


export { postWithdrawController, postConfirmWithdrawController}
