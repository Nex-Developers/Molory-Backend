import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEdit({
    vehicleDb,
    saveProfile
}: any = {}) {
    if (!vehicleDb || !saveProfile) throw new ServerError()
    return async ({
        userId,
        id,
        type,
        color,
        model,
        numberPlate,
        registrationDoc
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')
        if (!userId) throw new MissingParamError('userId')

        const data: any = {}
        if (type) data.type = type
        if (color) data.color = color
        if (model) data.model = model
        if (numberPlate) data.numberPlate = numberPlate
        if (registrationDoc) data.registrationDoc = registrationDoc

        
        if( Object.keys(data).length === 0) throw new MissingParamError('all')
        await vehicleDb.updateOne({ where: { id}, data })
        saveProfile(userId)
        const message = { text: "response.edit" }
        return { message }
    } 
}