import { MissingParamError, ServerError } from "../../../utils/errors"

export default ({
    questionDb
}: any ) => {
    if (!questionDb)  throw new ServerError()
    return async ({
        value
    }) => {
        if (!value) throw new MissingParamError('value')
        const { id } = await questionDb.insertOne({ data: {value}})
        const message = { text: 'response.add' }
        return { message, id }
    }
}
