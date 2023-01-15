import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEdit({
    tripDb
}: any = {}) {
    if (!tripDb) throw new ServerError()
    return async ({
        id,
        description
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')
        if (!description) throw new MissingParamError('description')

        await tripDb.updateOne({ where: { id}, data: { description } })
        const message = { text: "response.edit" }
        return { message }
    } 
}