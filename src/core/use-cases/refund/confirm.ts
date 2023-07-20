import { ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeConfirm({
    checkCinetpayTransfert,
    notifyUser
}: any = {}) {
    if (!checkCinetpayTransfert || !notifyUser) throw new ServerError()
    return async ({
        transaction_id,
        client_transaction_id,
        amount,
        sending_status,
        validated_at
    }: any = {}) => {
        console.log(transaction_id, client_transaction_id, amount, sending_status, validated_at)
        const prisma = DbConnection.prisma
        const refund = await prisma.transaction.findUnique({ where: { id: client_transaction_id } })
        if (refund.status === 2) {
            const transactionData = await checkCinetpayTransfert({ id: transaction_id })
            console.log(transactionData)
            if (!transactionData) return
            if (+transactionData.amount !== refund.amount) {
                // security issue mail administrator
                console.log('transaction amount mismatch', transactionData.amount, refund.amount)
                return //bocked
            }
            let res
            if (transactionData.transfer_valid == 'Y') {
                res = 'SUCCESS'
                await prisma.transaction.update({ where: { id: client_transaction_id }, data: { status: 1, validatedAt: new Date(validated_at) } })
                notifyUser({ id: refund.walletId, titleRef: { text: 'notification.withdralConfirmed.title' }, messageRef: { text: 'notification.withdralConfirmed.message' }, cover: null, data: { path: 'confirm-refund', id: client_transaction_id, res }, lang: 'fr' })
            } else {
                res = 'WARNING'
                await prisma.transaction.update({ where: { id: client_transaction_id }, data: { status: 3, validatedAt: new Date(validated_at) } })
                notifyUser({ id: refund.walletId, titleRef: { text: 'notification.withdralConfirmed.title' }, messageRef: { text: 'notification.withdralConfirmed.message' }, cover: null, data: { path: 'confirm-refund', id: client_transaction_id, res }, lang: 'fr' })
            }
        }
    }
}
