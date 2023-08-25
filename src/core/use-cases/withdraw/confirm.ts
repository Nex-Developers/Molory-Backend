import { AlreadyDoneError, MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

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
        const status = entity.status === 'sent' ? 1 : 0

        // Update the satus
        const transaction = await prisma.transaction.findUnique({ where: { id: 'trans-'+ entity.id } })
        if (transaction.status !== 2) throw new AlreadyDoneError(transaction.createdAt.toString())
        await prisma.wallet.update({ where: { id: transaction.walletId }, data: { balance: { decrement: transaction.amount } } })
        await prisma.transaction.update({ where: { id: transaction.id }, data: { status, method: entity.mode } })
        await updateTransaction(entity.id, status, { method: entity.mode})
        await saveProfile(transaction.walletId)

        return { recieved: true }
    }
}
