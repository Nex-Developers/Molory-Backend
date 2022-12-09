import { MissingParamError, ServerError } from "../../../utils/errors"

export default ({
    answerDb
}: any ) => {
    if (!answerDb)  throw new ServerError()
    return async ({
        id
    }) => {
        if (!id) throw new MissingParamError('id')
        await answerDb.deleteOne({ where: {id}})
        const message = { text: 'response.remove' }
        return { message }
    }
}
