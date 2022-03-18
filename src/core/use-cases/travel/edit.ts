import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEdit({
    travelDb
}: any = {}) {
    if (!travelDb) throw new ServerError()
    return async ({
        id,
        title,
        description
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data: any = {}
        if (title) data.title = title
        if (description) data.description = description
        
        if( Object.keys(data).length === 0) throw new MissingParamError('all')
        await travelDb.updateOne({ where: { id}, data })
        const message = "response.edit"
        return { message }
    } 
}