import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEdit({
    tripDb
}: any = {}) {
    if (!tripDb) throw new ServerError()
    return async ({
        id,
        seats
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data: any = {}
        if (seats) data.seats = seats
        
        if( Object.keys(data).length === 0) throw new MissingParamError('all')
        await tripDb.updateOne({ where: { id}, data })
        const message = "response.edit"
        return { message }
    } 
}