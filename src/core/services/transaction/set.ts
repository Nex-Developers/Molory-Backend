import {  MissingParamError, ServerError } from "../../../utils/errors"

export default function makeSet({
   set
}: any = {}) {
    if (!set) throw new ServerError()
    return async ({
        id,
        data
    }) => {
        if (!id) throw new MissingParamError("id")
        // if (!status) throw new InvalidParamError("status")
        await set('transactions', 'trans-' + id, data)
        return
    }
}