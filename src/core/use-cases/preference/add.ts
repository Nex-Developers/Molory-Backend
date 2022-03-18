import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    preferenceDb
}: any = {}) {
    if (!preferenceDb) throw new ServerError()
    return async ({
        title,
        description
    }: any = {}) => {
        if (!title) throw new MissingParamError('title')
        if (!description) throw new MissingParamError('description')
        const { id } = await preferenceDb.insertOne({ data: { title, description }})
        const message = "response.add"
        return { message, id }
    } 
}