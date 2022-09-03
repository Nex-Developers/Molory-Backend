import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    preferenceDb
}: any = {}) {
    if (!preferenceDb) throw new ServerError()
    return async ({
        question,
        answer
    }: any = {}) => {
        if (!question) throw new MissingParamError('question')
        if (!answer) throw new MissingParamError('answer')
        const { id } = await preferenceDb.insertOne({ data: { question, answer }})
        const message = { text: "response.add"}
        return { message, id }
    } 
}   