import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    vehicleDb
}: any = {}) {
    if (!vehicleDb) throw new ServerError()
    return async ({
        type,
        color,
        numberPlate,
        registrationDoc
    }: any = {}) => {
        if (!type) throw new MissingParamError('type')
        if (!color) throw new MissingParamError('color')
        if (!numberPlate) throw new MissingParamError('numberPlate')
        if (!registrationDoc) throw new MissingParamError('registrationDoc')

        const { id } = await vehicleDb.insertOne({ data: { type, color, numberPlate, registrationDoc }})
        const message = "response.add"
        return { message, id }
    } 
}