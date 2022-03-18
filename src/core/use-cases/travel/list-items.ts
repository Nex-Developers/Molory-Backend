import { ServerError } from "../../../utils/errors"

export default function makeListItems({
    travelDb
}: any = {}) {
    if (!travelDb) throw new ServerError()
    return async ({
        startAt,
        limit
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const data = await travelDb.findMany({ 
            startAt, 
            limit, 
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true
            }
        })
        return { data }
    } 
}