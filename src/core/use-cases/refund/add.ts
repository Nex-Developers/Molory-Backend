import { AlreadyDoneError } from './../../../utils/errors/already-done-error';
import { MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeAdd({
    addCinetpayContacts,
    cinetpayTransfert
}: any = {}) {
    if (!addCinetpayContacts || !cinetpayTransfert) throw new ServerError()

    return async ({
        id,
        phoneNumber,
    }: any = {}) => {
        const prisma = DbConnection.prisma
        if (!phoneNumber) throw new MissingParamError('phoneNumber')
        const { firstName, lastName, email } = await prisma.user.findUnique({ where: { id }, select: { lastName: true, firstName: true, email: true}})
        const { amount, status } = await prisma.refund.findUnique({ where: { id }, select: { amount: true, status: true}}) 
        if(status !== 3) throw new AlreadyDoneError('some time')
        await addCinetpayContacts({ firstName, lastName, email})
       await cinetpayTransfert({ id, amount, phoneNumber })
        await prisma.refund.update({ where: { id }, data: {  status: 2 }})
        const message = { text: "response.add" }
        return { message, id }
    } 
}