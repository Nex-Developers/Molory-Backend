import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    paymentDb
}: any = {}) {
    if (!paymentDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data = await paymentDb.findFirst({ 
            where: {
                id
            }, 
            select: {
                id: true,
                method: true,
                amount: true,
                receivedAmount: true,
                reference: true,
                accessNumber: true,
                createdAt: true,
                validatedAt: true,
                status: true,
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        lastName: true,
                        firstName: true,
                        phoneNumber: true,
                        role: true
                    }
                },
                travel: { select: {
                    id: true,
                    status: true,
                    createdAt: true
                }}
            }
        })
        return { data }
    } 
}