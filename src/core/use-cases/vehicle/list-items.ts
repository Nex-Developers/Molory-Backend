import { ServerError } from "../../../utils/errors"

export default function makeListItems({
    vehicleDb
}: any = {}) {
    if (!vehicleDb) throw new ServerError()
    return async ({
        startAt,
        limit,
        userId
    }: any = {}) => {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const data = await vehicleDb.findMany({ 
            startAt, 
            limit, 
            where: { userId },
            select: {
                id: true,
                type: true,
                model: true,
                color: true,
                numberPlate: true,
                registrationDoc: true,
                createdAt: true
            }
        })
        return { count: data.length, startAt, limit, data }
    } 
}