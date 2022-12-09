import { MissingParamError, ServerError } from "../../../utils/errors"

export default ({
    answerDb
}: any ) => {
    if (!answerDb)  throw new ServerError()
    return async ({
        id,
        questionId,
        value
    }) => {
        if (!id) throw new MissingParamError('id')
        const data = {}
        if (questionId) data['questionId'] = questionId
        if (value) data['value'] = value
        if (!Object.keys(data).length) throw new MissingParamError('questionId, value')
        await answerDb.updateOne({ where: {id}, data })
        const message = { text: 'response.edit' }
        return { message }
    }
}
