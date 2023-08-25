import { AlreadyDoneError, MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeConfirm({
    updateTransaction,
    saveProfile
}: any = {}) {
    if (!updateTransaction || !saveProfile) throw new ServerError()
    return async ({
        body
    }: any = {}) => {
        if (!body) throw new MissingParamError('body')
        const prisma = DbConnection.prisma
        const { entity, name } = body
        console.log(name, entity.status)
        if (!entity && !entity.id) return { recieved: false }
        const status = entity.status === 'sent' ? 1 : 0

        // Update the satus
        const transaction = await prisma.transaction.findUnique({ where: { id: 'trans-'+ entity.id } })
        if (transaction.status !== 2) throw new AlreadyDoneError(transaction.createdAt.toString())
        if (status === 1) {
            console.log('withraw', transaction.walletId, transaction.amount)
            await prisma.wallet.update({ where: { id: transaction.walletId }, data: { balance: { increment: -transaction.amount } } })
        }
        await prisma.transaction.update({ where: { id: transaction.id }, data: { status, method: entity.mode, validatedAt: new Date() } })
        await updateTransaction(entity.id, status, { method: entity.mode})
        await saveProfile(transaction.walletId)

        return { recieved: true }
    }
}
