import { MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeConfirm({
    checkCinetpayTansfert
}: any = {}) {
    if (!checkCinetpayTansfert) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')
        const prisma = DbConnection.prisma
        const withDrawal = await prisma.withdrawal.findUnique({ where: { id }})
        if(withDrawal.status === 2) {
           const transactionData = await checkCinetpayTansfert({ id})
            if(!transactionData) return
            if(transactionData.amount !== withDrawal.amount) {
                // security issue mail administrator
                console.log('transaction amount mismatch', transactionData.amount, withDrawal.amount)
                return //bocked
            }
            if(transactionData.status == '00') {
                await prisma.wallet.update({ where: { id: withDrawal.walletId }, data: { balance: { decrement: withDrawal.amount }}})
                await prisma.withdrawal.update({ where: { id }, data: { status: 1}})
            }
        } 
    } 
}
