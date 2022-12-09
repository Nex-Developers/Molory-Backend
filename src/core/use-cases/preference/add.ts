import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    preferenceDb
}: any = {}) {
    if (!preferenceDb) throw new ServerError()
    return async ({
        userId,
        preferences
    }: any = {}) => {
        if (!userId) throw new MissingParamError('userId')
        await preferenceDb.deleteMany({ where: { userId }, force: true })
        const promises = await preferences.map(async ({ questionId, answerId }) => {
            if (!questionId) throw new MissingParamError('questionId')
            if (!answerId) throw new MissingParamError('answerId')
            const preference = await preferenceDb.findFirst({ where: { userId, questionId } })
            if (preference) await preferenceDb.updateOne({ where: { userId, questionId }, data: { answerId } })
            else await preferenceDb.insertOne({ data: { userId, questionId, answerId } })
            return
        })
        return Promise.all(promises).then(() => {
            const message = { text: "response.add" }
            return { message }
        })
    }
}   
