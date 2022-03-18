import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    vehicleTypeDb
}: any = {}) {
    if (!vehicleTypeDb) throw new ServerError()
    return async ({
        name,
        description
    }: any = {}) => {
        if (!name) throw new MissingParamError('name')
        if (!description) throw new MissingParamError('description')
        const { id } = await vehicleTypeDb.insertOne({ data: { name, description }})
        const message = "response.add"
        return { message, id }
    } 
}