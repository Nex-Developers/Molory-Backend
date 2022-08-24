import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeConfirm({
    withdrawalDb
}: any = {}) {
    if (!withdrawalDb) throw new ServerError()
    return async ({
        id,
        amount,
        status
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')
        if (!amount) throw new MissingParamError('amount')
        const withDrawal = await withdrawalDb.findFirst({ where: { id }})
        if (withDrawal.amount != amount) throw new MissingParamError('amount')
        let validationStatus = 0
        if (status === "00") validationStatus = 1
        await withdrawalDb.updateOne({ where: { id }, data: { status: validationStatus }})
        const message = { text: "response.edit" }
        return { message }
    } 
}
