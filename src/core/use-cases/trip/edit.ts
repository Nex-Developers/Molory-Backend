import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEdit({
    tripDb,
    saveTrip
}: any = {}) {
    if (!tripDb || !saveTrip) throw new ServerError()
    return async ({
        id,
        description
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')
        if (!description) throw new MissingParamError('description')

        await tripDb.updateOne({ where: { id}, data: { description } })
        saveTrip(id)
        const message = { text: "response.edit" }
        return { message }
    } 
}