import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeConfirm({
    decriptEvent,
    verifyTransaction,
    getByDoc,
    updateDoc,
    confirmTravel
}: any = {}) {
    if (!decriptEvent || !verifyTransaction || !getByDoc || !updateDoc || !confirmTravel) throw new ServerError()
    return async ({
        token,
        body
    }: any = {}) => {
        if (!token) throw new MissingParamError('token')
        if (!body) throw new MissingParamError('body')
        const { entity, name } = body
        console.log(name)
        // const event =  decriptEvent(body, token)
        if (!entity && !entity.id) return { recieved: false }
        // const res = await verifyTransaction(entity.id)
        console.log('status', entity.status)
        const status = (entity.status === 'canceled' || entity.status==='declined')?0:entity.status === 'approved'?1:-1
        await updateDoc('payments', 'payment-'+ entity.id, { status })
        if (status === 1) {
            const payment = await getByDoc('payments', 'payment-' + entity.id)
            console.log(payment)
            await confirmTravel({ id: payment.paymentId, status: payment.status, amount: payment.amount, method: 'fedapay', reference: payment.id, validatedAt: new Date() })
            return { recieved: false}
        } else {
            const message = { recieved: true }
            return { message }
        }
    }
}
