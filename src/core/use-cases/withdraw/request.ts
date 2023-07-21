import { MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"
import { v4 } from 'uuid'

export default function makeRequest({
    saveTransaction
}: any = {}) {
    if (!saveTransaction) throw new ServerError()

    const generateUid = async () => {
        const uid = v4()
        return uid
    }

    return async ({
        amount,
        phoneNumber,
        userId
    }: any = {}) => {
        console.log(amount, userId);
        if (!userId) throw new MissingParamError('userId')
        if (!phoneNumber) throw new MissingParamError('phoneNumber')
        if (!amount) throw new MissingParamError('amount')
        const prisma = DbConnection.prisma
        const { firstName, lastName, email } =  await prisma.user.findUnique({ where: { id: userId }})
        const id = await generateUid()
        const res = await saveTransaction({ id, amount, firstName, lastName, email, phoneNumber, type: 'withdraw' })
        const message = { text: "response.add", res}
        return { message, res }
    } 
}
