import { MissingParamError, ServerError } from "../../../utils/errors"

export default ({
    questionDb
}: any ) => {
    if (!questionDb)  throw new ServerError()
    return async ({
        id
    }) => {
        if (!id) throw new MissingParamError('id')
        await questionDb.deleteOne({ where: {id}})
        const message = { text: 'response.remove' }
        return { message }
    }
}
