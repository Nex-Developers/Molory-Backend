import { MissingParamError, ServerError } from "../../../utils/errors"

export default ({
    notificationDb
}: any ) => {
    if (!notificationDb)  throw new ServerError()
    return async ({
        id,
        value
    }) => {
        if (!id) throw new MissingParamError('id')
        if (!value) throw new MissingParamError('value')
        await notificationDb.updateOne({ where: {id}, data: { seenAt: new Date(), status: 1 }})
        const message = { text: 'response.edit' }
        return { message }
    }
}
