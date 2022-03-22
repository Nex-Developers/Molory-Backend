import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeRemove({
    preferenceDb
}: any = {}) {
    if (!preferenceDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        await preferenceDb.deleteOne({ 
            where: {
                id
            }
        })
        const message = { text: 'response.remove'}
        return { message }
    } 
}