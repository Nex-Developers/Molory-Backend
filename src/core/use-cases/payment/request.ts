import { MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"
import { v4 } from 'uuid'

export default function makeRequestPayment({
    pay
}: any = {}) {
    if (!pay) throw new ServerError()

    const generateUid = async () => {
        const uid = v4()
        return uid
    }

    return async ({
        amount,
        customerId
    }: any = {}) => {
        console.log(amount, customerId);
        if (!amount) throw new MissingParamError('amount')
        const prisma = DbConnection.prisma
        const { firstName, lastName, email, phoneNumber } =  await prisma.user.findUnique({ where: { id: customerId }})
        console.log(firstName, lastName, email, phoneNumber);
        const id = await generateUid()
        const res = await pay({ id, amount, firstName, lastName, email, phoneNumber })
        const message = { text: "response.add", res}
        return { message, res }
    } 
}
