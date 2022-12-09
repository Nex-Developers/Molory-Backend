import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEdit({
    preferenceDb
}: any = {}) {
    if (!preferenceDb) throw new ServerError()
    return async ({
        userId,
        questionId,
        answerId
    }: any = {}) => {
        if (!userId) throw new MissingParamError('id')
        if (!questionId) throw new MissingParamError('questionId')
        if (!answerId) throw new MissingParamError('answerId')       
        
        await preferenceDb.updateOne({ where: { userId, questionId}, data: { answerId } })
        const message = { text: "response.edit"}
        return { message }
    } 
}