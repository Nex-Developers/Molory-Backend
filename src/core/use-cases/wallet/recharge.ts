import { MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"
import { v4 } from 'uuid'

const makeRecharge = ({
    setTransaction,
    saveProfile,
    notifyUser,
}) => {
    if (!setTransaction || !saveProfile || !notifyUser) throw new ServerError()
    const generateUid = async () => {
        const uid = v4()
        return uid
    }
    return async ({
        userId,
        amount
    }: { userId: number, amount: number }) => {
        if (!userId) throw new MissingParamError('userId')
        if (!amount) throw new MissingParamError('amount')
        const prisma = DbConnection.prisma
        const { firstName, lastName, email, phoneNumber } = await prisma.user.findUnique({ where: { id: userId } })
        console.log(firstName, lastName, email, phoneNumber);
        const id = await generateUid()
        // const res = await saveTransaction({ id, amount, firstName, lastName, email, phoneNumber, type: 'recharge', params: { userId } })
        const trans = await prisma.transaction.create({ data: { id, amount, type: 'recharge', ref: 'trans-' + id, wallet: { connect: { id: userId } } } })
        await prisma.wallet.update({ where: { id: userId }, data: { balance: { increment: amount } } })
        await prisma.transaction.update({ where: { id: trans.id }, data: { status: 1 } })
        await setTransaction({ id: trans.id, data: { id, amount, firstName, lastName, email, phoneNumber, type: 'recharge',userId  } })
        notifyUser({ id: userId, titleRef: { text: 'notification.rechargeWallet.title' }, messageRef: { text: 'notification.rechargeWallet.message', params: { amount: amount, method: 'Molory' } }, lang: 'fr', type: 'wallet' })
        const message = { text: "response.add" }
        return { message, id }
    }
}

export default makeRecharge