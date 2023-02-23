import { ServerError } from "../../../utils/errors"

export default function makeListItems({
    paymentDb
}: any = {}) {
    if (!paymentDb) throw new ServerError()
    return async ({
        startAt,
        limit
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const data = await paymentDb.findMany({
            startAt,
            limit,
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
                travel: {
                    select: {
                        id: true,
                        status: true,
                        createdAt: true
                    }
                }
            }
        })

        return {
            data: data.map(item => {
                const { user, ...res } = item
                return {
                    ...res,
                    ...user
                }
            })
        }
    }
}
