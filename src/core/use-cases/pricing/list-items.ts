import { ServerError } from "../../../utils/errors"

export default function makeListItems({
    pricingDb
}: any = {}) {
    if (!pricingDb) throw new ServerError()
    return async ({
        startAt,
        limit
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const data = await pricingDb.findMany({ 
            startAt, 
            limit, 
            select: {
                id: true,
                vehicleTypeName: true,
                lowerDistance: true,
                upperDistance: true,
                unitPrice: true,
                createdAt: true
            }
        })
        return { data }
    } 
}