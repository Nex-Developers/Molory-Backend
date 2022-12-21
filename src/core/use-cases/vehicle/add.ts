import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    vehicleDb,
    saveProfile
}: any = {}) {
    if (!vehicleDb || !saveProfile) throw new ServerError()
    return async ({
        userId,
        type,
        model,
        color,
        numberPlate
    }: any = {}) => {
        if (!userId) throw new MissingParamError('userId')
        if (!type) throw new MissingParamError('type')
        if (!color) throw new MissingParamError('color')
        if (!numberPlate) throw new MissingParamError('numberPlate')
        if (!model) throw new MissingParamError('model')

        const { id } = await vehicleDb.insertOne({ data: { userId, type, color, model, numberPlate }})
        saveProfile(userId)
        const message = { text: "response.add" }
        return { message, id }
    } 
}