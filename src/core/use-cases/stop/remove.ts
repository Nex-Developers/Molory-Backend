import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeRemove({
    stopDb
}: any = {}) {
    if (!stopDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        await stopDb.deleteOne({ 
            where: {
                id: true
            }
        })
        const message = {text: 'response.remove' }
        return { message }
    } 
}