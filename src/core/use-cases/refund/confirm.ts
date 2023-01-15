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
        const refund = await prisma.refund.findUnique({ where: { id }})
        if(refund.status === 2) {
           const transactionData = await checkCinetpayTansfert({ id})
            if(!transactionData) return
            if(transactionData.amount !== refund.amount) {
                // security issue mail administrator
                console.log('transaction amount mismatch', transactionData.amount, refund.amount)
                return //bocked
            }
            if(transactionData.status == '00') {
                await prisma.refund.update({ where: { id }, data: { status: 1}})
            }
        } 
    } 
}
