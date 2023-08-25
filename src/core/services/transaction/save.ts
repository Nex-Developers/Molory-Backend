import { InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeSave({
    createTransaction, 
    createWithdrawTransaction,
    set
}: any = {}) {
    if (!createTransaction || !set) throw new ServerError()
    return async ({
        id,
        amount,
        firstName,
        lastName,
        email = "",
        phoneNumber = "",
        type,
        method,
        params
    }) => {
        // if (!id) throw new MissingParamError("id")
        if (!type) throw new InvalidParamError("type")
        if (!firstName) throw new MissingParamError("firstName")
        if (!lastName) throw new MissingParamError("lastName")
        if (!phoneNumber) phoneNumber = ""
        if (!amount) throw new MissingParamError('amount')
        if (!email) email = ''
        // console.log(firstName, lastName, amount, email);
        let transactionId = 'trans-' + id
        let operation
        const data: any = { firstName, lastName, email, phoneNumber, amount, ref: id, transactionId: id, type, status: 2, ...params }
        if(type === 'recharge'){
            operation = await createTransaction(amount, firstName, lastName, email, phoneNumber)
            transactionId = 'trans-' + operation.transactionId
            data.ref = operation.transactionId.toString()
            data.url = operation.url
        } else if(type === 'withdraw') {
            operation = await createWithdrawTransaction(amount, firstName, lastName, phoneNumber);
            console.log('operation', operation)
            if (operation) {
                transactionId = 'trans-' + operation.id
                data.transactionId = transactionId
                data.ref = operation.reference
            }
         
        } else if (type === 'payment' && method === 'wallet') {
            // check balance
            const  prisma = DbConnection.prisma
            const { balance } = await prisma.wallet.findUnique({ where: { id: params.userId }})
            if (balance < amount) throw new InvalidParamError('balance')
            data.ref = id,
            transactionId = 'trans-'+ id
            // return cando
        } else if (type === 'payment' && method !== 'wallet') {
            if (!phoneNumber) throw new InvalidParamError('Missing phone number')
            operation = await createTransaction(amount, firstName, lastName, email, phoneNumber)
            transactionId = 'trans-' + operation.transactionId
            data.ref = id
            data.url = operation.url
        }
        await set('transactions', transactionId, data)
        return { url: data.url, transactionId: data.ref, id: transactionId}
    
    }
   
}