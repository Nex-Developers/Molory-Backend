import { ServerError } from "../../../utils/errors"

export default function makeListItems({
    vehicleDb
}: any = {}) {
    if (!vehicleDb) throw new ServerError()
    return async ({
        startAt,
        limit
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const data = await vehicleDb.findMany({ 
            startAt, 
            limit, 
            select: {
                id: true,
                type: true,
                color: true,
                numberPlate: true,
                registrationDoc: true,
                createdAt: true
            }
        })
        return { count: data.length, startAt, limit, data }
    } 
}