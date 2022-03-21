import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeRemove({
    travelDb
}: any = {}) {
    if (!travelDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        await travelDb.deleteOne({ 
            where: {
                id: true
            }
        })
        const message = { text: 'response.remove' }
        return { message }
    } 
}