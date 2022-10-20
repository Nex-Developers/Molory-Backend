import { ServerError } from "../../../utils/errors"

export default function makeListItems({
    withdrawalDb
}: any = {}) {
    if (!withdrawalDb) throw new ServerError()
    return async ({
        startAt,
        limit
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const data = await withdrawalDb.findMany({ 
            startAt, 
            limit, 
            select: {
                type: true,
                method: true,
                amount: true,
                accessNumber: true,
                status: true,
                wallet: {
                    select: {
                        id: true,
                        balance: true,
                        user: {
                            select: {
                                id: true,
                                avatar: true,
                                lastName: true,
                                firstName: true,
                                phoneNumber: true,
                                role: true
                            }
                        }
                    }
                }
            }
        })
        return { data }
    } 
}