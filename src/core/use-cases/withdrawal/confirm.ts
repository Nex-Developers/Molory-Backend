import { ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeConfirm({
    checkCinetpayTransfert,
    notifyUser
}: any = {}) {
    if (!checkCinetpayTransfert) throw new ServerError()
    return async ({
        transaction_id,
        client_transaction_id,
        amount,
        sending_status,
        validated_at
    }: any = {}) => {
        console.log(transaction_id, client_transaction_id, amount, sending_status, validated_at)
        const prisma = DbConnection.prisma
        const withDrawal = await prisma.withdrawal.findUnique({ where: { id: client_transaction_id }})
        if(withDrawal.status === 2) {
           const transactionData = await checkCinetpayTransfert({ id:   transaction_id})
           console.log(transactionData) 
           if(!transactionData) return
            if(+transactionData.amount !== withDrawal.amount) {
                // security issue mail administrator
                console.log('transaction amount mismatch', transactionData.amount, withDrawal.amount)
                return //bocked
            }
            if(transactionData.transfer_valid == 'Y') {
                await prisma.withdrawal.update({ where: { id: client_transaction_id }, data: { status: 1, method: transactionData.operator, validatedAt: new Date(transactionData.validated_at) }})
                // notify the user
                notifyUser({ id: withDrawal.walletId, titleRef: { text: 'notification.withdralConfirmed.title'}, messageRef: { text: 'notification.withdralConfirmed.message'}, cover: null, data: { type: 'withdrawal', id: client_transaction_id}, lang: 'fr' })
            }
            else {
                await prisma.withdrawal.update({ where: { id: client_transaction_id }, data: { status: 0, validatedAt: new Date(transactionData.validated_at) }})
                await prisma.wallet.update({ where: { id: withDrawal.walletId}, data: { balance: { increment: withDrawal.amount }}})
            // notify the user
            }
        } 
        else console.log("Already done", withDrawal.status)
    } 
}
