import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeCancel({
    tripDb
}: any = {}) {
    if (!tripDb) throw new ServerError()
    return async ({
        id,
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')
        //get trip status 

        // cancel routes

        // get travels 
            
            //cancel travels

            // cancel payments

        await tripDb.updateOne({ where: { id}, data: { status: 0} })
        const message = { text: "response.add" }
        return { message }
    } 
}
