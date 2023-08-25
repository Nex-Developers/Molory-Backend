import {  MissingParamError, ServerError } from "../../../utils/errors"

export default function makeUpdate({
   update
}: any = {}) {
    if (!update) throw new ServerError()
    return async ({
        id,
        status,
        params
    }) => {
        if (!id) throw new MissingParamError("id")
        // if (!status) throw new InvalidParamError("status")
        await update('transactions', 'trans-' + id, { ...params, status })
        // switch (type) {
        //     case 'withdraw':
        //         await update('withdraws', 'withdraw-' + res.transactionId, { firstName, lastName, email, phoneNumber, amount, url: res.url, ref: res.transactionId, transactionId: id, withdrawId: typeId, status: 2 })
        //         break;

        //     case 'recharge':
        //         await update('recharges', 'recharge-' + res.transactionId, { firstName, lastName, email, phoneNumber, amount, url: res.url, ref: res.transactionId, transactionId: id, rechargeId: typeId, status: 2 })
        //         break;

        //     case 'payment':
        //         await update('payments', 'payment-' + res.transactionId, { firstName, lastName, email, phoneNumber, amount, url: res.url, ref: res.transactionId, transactionId: id, paymentId: typeId, status: 2, bookingStatus: 2 })

        //         break;

        //     case 'transfer':
        //         await update('transfert', 'transfert-' + res.transactionId, { firstName, lastName, email, phoneNumber, amount, url: res.url, ref: res.transactionId, transactionId: id, transferId: typeId, status: 2 })
        //         break;

        //     default:


        // }
        return
    }
}