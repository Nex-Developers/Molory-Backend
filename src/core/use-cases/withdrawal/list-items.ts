import { ServerError } from "../../../utils/errors"

export default function makeListItems({
    withdrawalDb
}: any = {}) {
    if (!withdrawalDb) throw new ServerError()
    return async ({
        userId,
        startAt,
        limit
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        let where
        if (userId) where = { walletId: userId }

        const data = await withdrawalDb.findMany({
            startAt,
            limit,
            where,
            orderBy: { createdAt: 'desc' },
            select: {
                method: true,
                amount: true,
                accessNumber: true,
                status: true,
                createdAt: true,
                validatedAt: true,
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        firstName: true,
                        lastName: true,
                        phoneNumber: true
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