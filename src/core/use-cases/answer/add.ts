import { MissingParamError, ServerError } from "../../../utils/errors"

export default ({
    answerDb
}: any ) => {
    if (!answerDb)  throw new ServerError()
    return async ({
        questionId,
        value
    }) => {
        if (!questionId) throw new MissingParamError('questionId')
        if (!value) throw new MissingParamError('value')
        const { id } = await answerDb.insertOne({ data: {questionId, value}})
        const message = { text: 'response.add' }
        return { message, id }
    }
}
