import { AlreadyDoneError, MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"
import { confirmPayment } from "../travel"

export default function makeConfirm({
    updateTransaction,
    saveProfile
}: any = {}) {
    if (!updateTransaction || !saveProfile) throw new ServerError()
    return async ({
        token,
        body
    }: any = {}) => {
        if (!token) throw new MissingParamError('token')
        if (!body) throw new MissingParamError('body')
        const prisma = DbConnection.prisma
        const { entity, name } = body
        console.log(name)
        if (!entity && !entity.id) return { recieved: false }
        console.log('status', entity.status)
        const status: number = (entity.status === 'canceled' || entity.status === 'declined') ? 0 : entity.status === 'approved' ? 1 : -1

        // Update the satus
        const transaction = await prisma.transaction.findFirst({ where: { ref: 'trans-' + entity.id } })
        console.log('transaction', transaction);
        if (transaction.status !== 2) throw new AlreadyDoneError(transaction.createdAt.toString())
        if (status === 1) {
          if (transaction.type ==="recharge")  await prisma.wallet.update({ where: { id: transaction.walletId }, data: { balance: { increment: transaction.amount } } })
        else if(transaction.type === 'payment') await confirmPayment({
            id: transaction.id,
            status,
            reference: transaction.ref,
            amount: transaction.amount,
            method: transaction.method,
            validatedAt: new Date()
        }) 
        }
        await prisma.transaction.update({ where: { id: transaction.id }, data: { status } })
        await updateTransaction({ id: entity.id, status, params: {} })
        await saveProfile(transaction.walletId)
        return { recieved: true }
    }
}