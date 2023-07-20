import { confirmRecharge, requestRecharge } from "../../core/use-cases/recharge";
import makePostConfirmController from "./confirm";
import makePostController from "./post";

const postRechargeController = makePostController({ requestRecharge })
const postConfirmRechargeController = makePostConfirmController({ confirmRecharge })


export { postRechargeController, postConfirmRechargeController}
