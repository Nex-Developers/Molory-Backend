import { MissingParamError, ServerError } from "../../../utils/errors"

export default ({
    questionDb
}: any ) => {
    if (!questionDb)  throw new ServerError()
    return async ({
        id,
        value
    }) => {
        if (!id) throw new MissingParamError('id')
        if (!value) throw new MissingParamError('value')
        await questionDb.updateOne({ where: {id}, data: {value}})
        const message = { text: 'response.edit' }
        return { message }
    }
}
