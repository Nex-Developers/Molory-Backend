import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEdit({
    vehicleTypeDb
}: any = {}) {
    if (!vehicleTypeDb) throw new ServerError()
    return async ({
        name,
        description
    }: any = {}) => {
        if (!name) throw new MissingParamError('name')

        const data: any = {}
        if (description) data.description = description
        
        if( Object.keys(data).length === 0) throw new MissingParamError('all')
        await vehicleTypeDb.updateOne({ where: { name }, data })
        const message = "response.edit"
        return { message }
    } 
}