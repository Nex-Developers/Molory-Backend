import { ServerError } from "../../../utils/errors"

export default function makeListItems({
    preferenceDb
}: any = {}) {
    if (!preferenceDb) throw new ServerError()
    return async ({
        startAt,
        limit
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const data = await preferenceDb.findMany({ 
            startAt, 
            limit, 
            select: {
                id: true,
                question: true,
                answer: true,
                createdAt: true
            }
        })
        return { data }
    } 
}
