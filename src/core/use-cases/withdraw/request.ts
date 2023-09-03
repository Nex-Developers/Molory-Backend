import { InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"
// import { v4 } from 'uuid'

export default function makeRequest({
    saveTransaction
}: any = {}) {
    if (!saveTransaction) throw new ServerError()

    // const generateUid = async () => {
    //     const uid = v4()
    //     return uid
    // }

    return async ({
        // amount,
        phoneNumber,
        userId
    }: any = {}) => {
        // console.log(amount, userId, phoneNumber);
        if (!userId) throw new MissingParamError('userId')
        if (!phoneNumber) throw new MissingParamError('phoneNumber')
        // if (!amount) throw new MissingParamError('amount')
        const prisma = DbConnection.prisma
        const { firstName, lastName, email } =  await prisma.user.findUnique({ where: { id: userId }})
        const { balance } = await prisma.wallet.findUnique({ where: { id: userId }})
        // const id = await generateUid()
        console.log(balance)
        if (balance < 100) throw new InvalidParamError("balance") 
        const res = await saveTransaction({ firstName, lastName, email, phoneNumber, amount: 100, type: 'withdraw', params: { userId } })
        await prisma.transaction.create({ data: { id: res.id, ref: res.transactionId, amount: balance, type: 'withdraw',  wallet: { connect: { id: userId } }}})
        const message = { text: "response.add"}
        return { message, data: {id: res.id, ref: res.transactionId, amount: balance} }
    } 
}
