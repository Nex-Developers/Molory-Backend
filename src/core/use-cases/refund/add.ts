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
        phone,
        prefix
    }: any = {}) => {
        const prisma = DbConnection.prisma
        if (!phone) throw new MissingParamError('phone')
        if (!prefix) throw new MissingParamError('prefix')
        const { firstName, lastName, email } = await prisma.user.findUnique({ where: { id }, select: { lastName: true, firstName: true, email: true}})
        const { amount, status } = await prisma.refund.findUnique({ where: { id }, select: { amount: true, status: true}}) 
        if(status !== 3) throw new AlreadyDoneError('some time')
        await addCinetpayContacts({ firstName, lastName, email, phone, prefix})
       await cinetpayTransfert({ id, amount, phone, prefix, path: 'refund-confirmation' })
        await prisma.refund.update({ where: { id }, data: {  status: 2 }})
        const message = { text: "response.add" }
        return { message, id }
    } 
}