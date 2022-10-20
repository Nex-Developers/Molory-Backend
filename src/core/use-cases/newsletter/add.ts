import { AlreadyDoneError, MissingParamError, ServerError } from "../../../utils/errors"

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
        const newsletter = await newsletterDb.findFirst({ where: {email} })
        if (newsletter) throw new AlreadyDoneError(newsletter.createdAt)
        await newsletterDb.insertOne({ data: { email, name } })
        const message = { text: "response.add"}
        return { message }
    } 
}