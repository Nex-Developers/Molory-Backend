import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeConfirm({
    tripDb
}: any = {}) {
    if (!tripDb) throw new ServerError()
    return async ({
        id,
        seats,
        duration, 
        price
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data: any = { status: 3 }
        if (seats) data.seats = seats
        if (duration) data.duration = duration
        if (price) data.price = price
        
        // if( Object.keys(data).length === 0) throw new MissingParamError('all')
        await tripDb.updateOne({ where: { id}, data })
        const message = { text: "response.add" }
        return { message }
    } 
}