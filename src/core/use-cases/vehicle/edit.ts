import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEdit({
    vehicleDb
}: any = {}) {
    if (!vehicleDb) throw new ServerError()
    return async ({
        id,
        type,
        color,
        numberPlate,
        registrationDoc
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data: any = {}
        if (type) data.type = type
        if (color) data.color = color
        if (numberPlate) data.numberPlate = numberPlate
        if (registrationDoc) data.registrationDoc = registrationDoc

        
        if( Object.keys(data).length === 0) throw new MissingParamError('all')
        await vehicleDb.updateOne({ where: { id}, data })
        const message = { text: "response.edit" }
        return { message }
    } 
}