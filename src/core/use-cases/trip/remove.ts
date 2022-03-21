import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeRemove({
    tripDb
}: any = {}) {
    if (!tripDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        await tripDb.deleteOne({ 
            where: {
                id: true
            }
        })
        const message = { text: 'response.remove' }
        return { message }
    } 
}