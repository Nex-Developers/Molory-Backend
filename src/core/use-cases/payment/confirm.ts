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
        console.log(token, body)
        const event =  decriptEvent(body, token)
        const res = await verifyTransaction(event.id || event.transaction_id)
        console.log('payment res', res)
      
        await updateDoc('payments', 'payment-' + event.id, { status: res ? 1 : 0 })
        if (res) {
            const payment = await getByDoc('payments', 'payment-' + event.id)
            console.log(payment)
            await confirmTravel({ id: payment.paymentId, status: payment.status, amount: payment.amount, method: 'fedapay', reference: payment.id, validatedAt: payment.updatedAt })
            return { recieved: false}
        } else {
            const message = { recieved: true }
            return { message }
        }
    }
}
