import { ServerError } from "../../../utils/errors"

export default function makeListItems({
    tripDb
}: any = {}) {
    if (!tripDb) throw new ServerError()
    return async ({
        startAt,
        limit,
        userId
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const where: any = {}
        if (userId) where.userId = userId
        const data = await tripDb.findMany({ 
            startAt, 
            limit,
            where, 
            select: {
                id: true,
                seats: true,
                status: true,
                routes: true,
                createdAt: true
            }
        })
        return { data }
    } 
}