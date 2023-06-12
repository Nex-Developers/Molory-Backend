import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makePay({
    createTransaction
}: any = {}) {
    if (!createTransaction) throw new ServerError()
    return async ({
        amount,
        firstName,
        lastName,
        email,
        phoneNumber,
    }) => {
        if (!firstName)throw new  MissingParamError("firstName")
        if (!lastName)throw new  MissingParamError("lastName")
        if (!phoneNumber)throw new  MissingParamError("phoneNumber")
        if (!amount) throw new MissingParamError('amount')
        if (!email) email = ''
        // console.log(firstName, lastName, amount, email);
        return await createTransaction(amount, firstName, lastName, email, phoneNumber)
    }
}