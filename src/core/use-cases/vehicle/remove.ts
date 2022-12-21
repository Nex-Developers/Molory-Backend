import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeRemove({
    vehicleDb,
    saveProfile
}: any = {}) {
    if (!vehicleDb || !saveProfile) throw new ServerError()
    return async ({
        id,
        userId
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')
        if (!userId) throw new MissingParamError('userId')

        await vehicleDb.deleteOne({ 
            where: {
                id
            }
        })
        saveProfile(userId)
        const message = { text: 'response.remove' }
        return { message }
    } 
}