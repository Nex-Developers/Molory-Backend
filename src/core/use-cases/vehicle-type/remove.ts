import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeRemove({
    vehicleTypeDb
}: any = {}) {
    if (!vehicleTypeDb) throw new ServerError()
    return async ({
        name
    }: any = {}) => {
        if (!name) throw new MissingParamError('name')

        await vehicleTypeDb.deleteOne({ 
            where: {
                name: true
            }
        })
        const message = { text: 'response.remove' }
        return { message }
    } 
}