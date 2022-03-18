import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    vehicleTypeDb
}: any = {}) {
    if (!vehicleTypeDb) throw new ServerError()
    return async ({
        name
    }: any = {}) => {
        if (!name) throw new MissingParamError('name')

        const data = await vehicleTypeDb.findFirst({ 
            where: {
                name
            }, 
            select: {
                name: true,
                description: true,
                createdAt: true
            }
        })
        return { data }
    } 
}