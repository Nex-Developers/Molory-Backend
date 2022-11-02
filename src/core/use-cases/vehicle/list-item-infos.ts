import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    vehicleDb
}: any = {}) {
    if (!vehicleDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data = await vehicleDb.findFirst({ 
            where: {
                id
            }, 
            select: {
                id: true,
                type: true,
                color: true,
                model: true,
                numberPlate: true,
                registrationDoc: true,
                createdAt: true
            }
        })
        return { data }
    } 
}