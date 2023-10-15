import { FedapayManager, FirestoreDb } from "../../../utils/helpers";
import makeUpdate from "./confirm";
import makeSave from "./save";
import makeSet from "./set";

const saveTransaction = makeSave({ createTransaction: FedapayManager.createTransaction, createWithdrawTransaction: FedapayManager.createWithdrawTransaction, set: FirestoreDb.set})
const updateTransaction = makeUpdate({ update: FirestoreDb.update })
const setTransaction = makeSet({ set: FirestoreDb.set})
export {
    saveTransaction,
    updateTransaction,
    setTransaction
}
