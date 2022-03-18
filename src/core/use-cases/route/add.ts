import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    routeDb
}: any = {}) {
    if (!routeDb) throw new ServerError()
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

        const { id } = await routeDb.insertOne({ data: { tripId, longitude, latitude, address, description, activateAt }})
        const message = "response.add"
        return { message, id }
    } 
}
