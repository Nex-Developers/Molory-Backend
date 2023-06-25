import { MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeRequestPayment({
    pay
}: any = {}) {
    if (!pay) throw new ServerError()
    return async ({
        amount,
        customerId
    }: any = {}) => {
        console.log(amount, customerId);
        if (!amount) throw new MissingParamError('amount')
        const prisma = DbConnection.prisma
        const { firstName, lastName, email, phoneNumber } =  await prisma.user.findUnique({ where: { id: customerId }})
        console.log(firstName, lastName, email, phoneNumber);
        const res = await pay({ amount, firstName, lastName, email, phoneNumber: phoneNumber.slice(3, phoneNumber.length) })
        const message = { text: "response.add", res}
        return { message, res }
    } 
}
