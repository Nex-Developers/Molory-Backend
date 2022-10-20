import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    stopDb
}: any = {}) {
    if (!stopDb) throw new ServerError()
    return async ({
        tripId,
        longitude,
        latitude,
        address,
        description,
        activateAt
    }: any = {}) => {
        if (!tripId) throw new MissingParamError('tripId')
        if (!longitude) throw new MissingParamError('longitude')
        if (!latitude) throw new MissingParamError('latitude')
        if (!address) throw new MissingParamError('address')

        const { id } = await stopDb.insertOne({ data: { tripId, longitude, latitude, address, description, activateAt }})
        const message = { text: "response.add" }
        return { message, id }
    } 
}
