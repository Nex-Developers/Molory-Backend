import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makePay({
    createTransaction, set
}: any = {}) {
    if (!createTransaction || !set) throw new ServerError()
    return async ({
        id,
        amount,
        firstName,
        lastName,
        email = "",
        phoneNumber = "",
    }) => {
        if (!id) throw new  MissingParamError("id")
        if (!firstName)throw new  MissingParamError("firstName")
        if (!lastName)throw new  MissingParamError("lastName")
        if (!phoneNumber)throw new  MissingParamError("phoneNumber")
        if (!amount) throw new MissingParamError('amount')
        if (!email) email = ''
        // console.log(firstName, lastName, amount, email);
        const res = await createTransaction(amount, firstName, lastName, email, phoneNumber)
        await set('payments', 'payment-'+res.transactionId, { firstName, lastName, email, phoneNumber, amount, url: res.url, transactionId: res.transactionId, paymentId: id,  status: 2, bookingStatus: 2 } )
        return res
    }
}