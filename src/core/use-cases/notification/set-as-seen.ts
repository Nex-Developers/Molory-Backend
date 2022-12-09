import { MissingParamError, ServerError } from "../../../utils/errors"

export default ({
    publicationDb
}: any) => {
    if (!publicationDb) throw new ServerError()
    return async ({
        id,
        userId
    }) => {
        if (!id) throw new MissingParamError('id')
        if (!userId) throw new MissingParamError('userId')
        await publicationDb.updateOne({
            where: { id },
            data: {
                notifications: {
                    updateMany: {
                        where: { receiverId: userId },
                        data: { seenAt: new Date() }
                    }
                }
            }
        })
        const message = { text: 'response.edit' }
        return { message }
    }
}
