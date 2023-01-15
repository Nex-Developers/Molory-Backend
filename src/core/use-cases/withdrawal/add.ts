import { MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"
import { v4 } from 'uuid'

export default function makeAdd({
    addCinetpayContacts,
    cinetpayTransfert
}: any = {}) {
    if (!addCinetpayContacts || !cinetpayTransfert) throw new ServerError()
    
    const generateUid = async (prisma) => {
        const uid = v4()
        const withdrawal = await prisma.withdrawal.findFirst({ where: { id: uid } })
        if (withdrawal) return await generateUid(prisma)
        return uid
    }


    return async ({
        userId,
        phoneNumber,
    }: any = {}) => {
        const prisma = DbConnection.prisma
        if (!phoneNumber) throw new MissingParamError('phoneNumber')
        const { firstName, lastName, email } = await prisma.user.findUnique({ where: { id: userId}, select: { lastName: true, firstName: true, email: true}})
        const { balance } = await prisma.wallet.findUnique({ where: { id: userId}, select: { balance: true}}) 
        await addCinetpayContacts({ firstName, lastName, email})
        const id = generateUid(prisma)
        await prisma.withdrawal.create({ data: { id, amount: balance, accessNumber: phoneNumber, wallet: { connect: { id: userId}} }})
        await cinetpayTransfert({ id, amount: balance, phoneNumber })
        await prisma.withdrawal.create({ data: { id, amount: balance, accessNumber: phoneNumber, status: 2, wallet: { connect: { id: userId}} }})
        const message = { text: "response.add" }
        return { message, id }
    } 
}
