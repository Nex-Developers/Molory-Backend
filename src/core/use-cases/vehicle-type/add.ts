import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    vehicleTypeDb
}: any = {}) {
    if (!vehicleTypeDb) throw new ServerError()
    return async ({
        name,
        description,
        maxSeats
    }: any = {}) => {
        if (!name) throw new MissingParamError('name')
        if (!description) throw new MissingParamError('description')
        await vehicleTypeDb.insertOne({ data: { name, description, maxSeats }})
        const message = { text: "response.add" }
        return { message }
    } 
}
