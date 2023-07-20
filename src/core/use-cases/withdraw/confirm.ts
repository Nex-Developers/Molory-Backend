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
        const status = (entity.status === 'canceled' || entity.status === 'declined') ? 0 : entity.status === 'approved' ? 1 : -1

        // Update the satus
        const transaction = await prisma.transaction.findUnique({ where: { id: entity.id } })
        if (transaction.status !== 2) throw new AlreadyDoneError(transaction.createdAt.toString())
        await prisma.wallet.update({ where: { id: transaction.walletId }, data: { balance: { increment: transaction.amount } } })
        if (status === 1) await prisma.transaction.update({ where: { id: transaction.id }, data: { status } })
        await updateTransaction(entity.id)
        await saveProfile(transaction.walletId)

        return { recieved: true }
    }
}
