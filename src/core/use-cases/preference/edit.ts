import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEdit({
    preferenceDb
}: any = {}) {
    if (!preferenceDb) throw new ServerError()
    return async ({
        id,
        question,
        answer
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data: any = {}
        if (question) data.question = question
        if (answer) data.answer = answer
        
        if( Object.keys(data).length === 0) throw new MissingParamError('all')
        await preferenceDb.updateOne({ where: { id}, data })
        const message = { text: "response.edit"}
        return { message }
    } 
}