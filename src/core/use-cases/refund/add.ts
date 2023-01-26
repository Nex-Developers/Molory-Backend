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
        const { amount, status, user} = await prisma.refund.findUnique({ where: { id }, select: { amount: true, status: true, user: { select: { lastName: true, firstName: true, email: true}}}})
        const { firstName, lastName, email } = user
        if(status !== 4) throw new AlreadyDoneError('some time')
        await addCinetpayContacts({ firstName, lastName, email, phone, prefix})
        const transactionId = await cinetpayTransfert({ id, amount, phone, prefix, path: 'refund-confirmation' })
        let newStatus = 3
        if(transactionId) newStatus = 2
        await prisma.refund.update({ where: { id }, data: { transactionId, status: newStatus }})
        const message = { text: "response.add" }
        return { message, id }
    } 
}