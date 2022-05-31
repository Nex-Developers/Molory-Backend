import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    newsletterDb
}: any = {}) {
    if (!newsletterDb) throw new ServerError()
    return async ({
        email,
        name
    }: any = {}) => {
        if (!email) throw new MissingParamError('email')
        if (!name) throw new MissingParamError('name')
     
        await newsletterDb.insertOne({ data: { email, name } })
        const message = { text: "response.add"}
        return { message }
    } 
}