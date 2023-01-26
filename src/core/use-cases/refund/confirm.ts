import { ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeConfirm({
    checkCinetpayTansfert,
    notifyUser
}: any = {}) {
    if (!checkCinetpayTansfert) throw new ServerError()
    return async ({
        transaction_id,
        client_transaction_id,
        amount,
        sending_status,
        validated_at
    }: any = {}) => {
        console.log(transaction_id, client_transaction_id, amount, sending_status, validated_at)
        const prisma = DbConnection.prisma
        const refund = await prisma.refund.findUnique({ where: { id:  client_transaction_id}})
        if(refund.status === 2) {
           const transactionData = await checkCinetpayTansfert({ id: transaction_id})
           console.log(transactionData)  
           if(!transactionData) return
            if(transactionData.amount !== refund.amount) {
                // security issue mail administrator
                console.log('transaction amount mismatch', transactionData.amount, refund.amount)
                return //bocked
            }
            if(transactionData.status == '00') {
                await prisma.refund.update({ where: { id: client_transaction_id }, data: { status: 1, validatedAt: new Date(validated_at)}})
                notifyUser({ id: refund.userId, titleRef: { text: 'notification.withdralConfirmed.title'}, messageRef: { text: 'notification.withdralConfirmed.message'}, cover: null, data: { type: 'withdrawal', id: client_transaction_id}, lang: 'fr' })
            }
        } 
    } 
}
