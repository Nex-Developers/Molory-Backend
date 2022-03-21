import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEdit({
    stopDb
}: any = {}) {
    if (!stopDb) throw new ServerError()
    return async ({
        id,
        longitude,
        latitude,
        address,
        description,
        activateAt
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data: any = {}
        if (longitude) data.longitude = longitude
        if (latitude) data.latitude = latitude
        if (address) data.address = address
        if (description) data.description = description
        if (activateAt) data.activateAt = activateAt
        
        if( Object.keys(data).length === 0) throw new MissingParamError('all')
        await stopDb.updateOne({ where: { id}, data })
        const message = { text: "response.edit" }
        return { message }
    } 
}