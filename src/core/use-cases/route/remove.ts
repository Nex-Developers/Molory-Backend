import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeRemove({
    routeDb
}: any = {}) {
    if (!routeDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        await routeDb.deleteOne({ 
            where: {
                id: true
            }
        })
        const message = { text: 'response.remove' }
        return { message }
    } 
}