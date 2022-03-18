import { ServerError } from "../../../utils/errors"

export default function makeListItems({
    vehicleTypeDb
}: any = {}) {
    if (!vehicleTypeDb) throw new ServerError()
    return async ({
        startAt,
        limit
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const data = await vehicleTypeDb.findMany({ 
            startAt, 
            limit, 
            select: {
                name: true,
                description: true,
                createdAt: true
            }
        })
        return { data }
    } 
}