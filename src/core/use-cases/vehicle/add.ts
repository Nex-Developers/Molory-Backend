import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    vehicleDb
}: any = {}) {
    if (!vehicleDb) throw new ServerError()
    return async ({
        userId,
        type,
        color,
        numberPlate
    }: any = {}) => {
        if (!userId) throw new MissingParamError('userId')
        if (!type) throw new MissingParamError('type')
        if (!color) throw new MissingParamError('color')
        if (!numberPlate) throw new MissingParamError('numberPlate')

        const { id } = await vehicleDb.insertOne({ data: { userId, type, color, numberPlate }})
        const message = { text: "response.add" }
        return { message, id }
    } 
}