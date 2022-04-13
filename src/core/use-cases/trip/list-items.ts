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
                departureDate: true,
                routes: {
                    select: {
                        distance: true,
                        duration: true,
                        price: true,
                        stops: true
                    }
                },
                createdAt: true
            }
        })
        return { count: data.length, startAt, limit, data }
    } 
}