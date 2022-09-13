import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeConfirm({
    tripDb
}: any = {}) {
    if (!tripDb) throw new ServerError()
    return async ({
        id,
        seats,
        routes, 
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data: any = { status: 3 }
        if (seats) {
            data.seats = seats
            data.remainingSeats = seats
        }
        if (routes && routes.length) {
            data.routes = { update: routes.map(({ id, price }) => ({ where: { id }, data: { price }}))}
        }
        // if( Object.keys(data).length === 0) throw new MissingParamError('all')
        await tripDb.updateOne({ where: { id}, data })
        const message = { text: "response.add" }
        return { message }
    } 
}