import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeRemove({
    vehicleDb
}: any = {}) {
    if (!vehicleDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        await vehicleDb.deleteOne({ 
            where: {
                id: true
            }
        })
        const message = { text: 'response.remove' }
        return { message }
    } 
}