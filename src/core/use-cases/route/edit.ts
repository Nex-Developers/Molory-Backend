import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEdit({
    routeDb
}: any = {}) {
    if (!routeDb) throw new ServerError()
    return async ({
        id,
        price,
        duration
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data: any = {}
        if (price) data.price = price
        if (duration) data.duration = duration

        if( Object.keys(data).length === 0) throw new MissingParamError('all')
        await routeDb.updateOne({ where: { id}, data })
        const message = "response.edit"
        return { message }
    } 
}