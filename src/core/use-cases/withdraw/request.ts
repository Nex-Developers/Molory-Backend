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
        userId
    }: any = {}) => {
        console.log(amount, userId);
        if (!amount) throw new MissingParamError('amount')
        const prisma = DbConnection.prisma
        const { firstName, lastName, email, phoneNumber } =  await prisma.user.findUnique({ where: { id: userId }})
        console.log(firstName, lastName, email, phoneNumber);
        const id = await generateUid()
        const res = await saveTransaction({ id, amount, firstName, lastName, email, phoneNumber, type: 'withdraw' })
        const message = { text: "response.add", res}
        return { message, res }
    } 
}
