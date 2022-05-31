import { ServerError } from "../../../utils/errors"

export default function makeList({
    newsletterDb
}: any = {}) {
    if (!newsletterDb) throw new ServerError()
    return async ({
        startAt,
        limit
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const data = await newsletterDb.findMany({ 
            startAt, 
            limit, 
            select: {
                email: true,
                name: true,
                createdAt: true
            }
        })
        return { data }
    } 
}