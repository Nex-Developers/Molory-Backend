import { UnauthorizedError } from './../../../utils/errors/unauthorized-error';
import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    withdrawalDb,
    walletDb
}: any = {}) {
    if (!withdrawalDb || !walletDb) throw new ServerError()
    return async ({
        userId,
        walletId,
        type,
        method,
        amount,
        accessNumber,
    }: any = {}) => {
        if (!walletId) throw new MissingParamError('walletId')
        if (!type) throw new MissingParamError('type')
        if (!method) throw new MissingParamError('method')
        if (!amount) throw new MissingParamError('amount')
        if (!accessNumber) throw new MissingParamError('access number')
        
        const wallet = await walletDb.findOne({ where: { id: walletId }})

        if (wallet.userId !== userId) throw new UnauthorizedError()
        if (wallet.amount < amount)  throw new UnauthorizedError()
        const { id } = await withdrawalDb.insertOne({ data: { walletId, type, method, amount, accessNumber }})
        const message = { text: "response.add" }
        return { message, id }
    } 
}
