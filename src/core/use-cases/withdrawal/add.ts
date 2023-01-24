import { InvalidParamError } from './../../../utils/errors/invalid-param-error';
import { MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"
import { v4 } from 'uuid'

export default function makeAdd({
    addCinetpayContacts,
    cinetpayTransfert,
    notifyUser
}: any = {}) {
    if (!addCinetpayContacts || !cinetpayTransfert || !notifyUser) throw new ServerError()
    
    const generateUid = async (prisma) => {
        const uid = v4()
        const withdrawal = await prisma.withdrawal.findFirst({ where: { id: uid } })
        if (withdrawal) return await generateUid(prisma)
        return uid
    }


    return async ({
        userId,
        prefix,
        phone,
    }: any = {}) => {
        const prisma = DbConnection.prisma
        if (!prefix) throw new MissingParamError('prefix')
        if (!phone) throw new MissingParamError('phone')
        const { firstName, lastName, email } = await prisma.user.findUnique({ where: { id: userId}, select: { lastName: true, firstName: true, email: true}})
        const { balance } = await prisma.wallet.findUnique({ where: { id: userId}, select: { balance: true}})
        if (!balance) throw new InvalidParamError('balance is null') 
        const res = await addCinetpayContacts({ firstName, lastName, email, prefix, phone})
        if(!res) throw new ServerError()
        const id = await generateUid(prisma)
        // await prisma.withdrawal.create({ data: { id, amount: balance, accessNumber: prefix + phone, wallet: { connect: { id: userId}} }})
       const transactionId = await cinetpayTransfert({ id, amount: balance, prefix, phone, path: 'withdrawal-confirmation' })
       let status = 3
       if(transactionId) status = 2
    //    else alert admin about widrawals balance.
        await prisma.withdrawal.create({ data: { id, amount: balance, accessNumber:prefix + phone, status, transactionId, wallet: { connect: { id: userId}} }})
        await prisma.wallet.update({ where: { id: userId }, data: { balance: 0}})
        notifyUser({ id: userId, titleRef: { text: 'notification.withdrawal.title'}, messageRef: { text: 'notification.withdrawal.message'}, cover: null, data: { type: 'withdrawal', id}, lang: 'fr' })
        const message = { text: "response.add" }
        return { message, id }
    } 
}
