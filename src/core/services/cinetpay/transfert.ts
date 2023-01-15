import { ServerError } from './../../../utils/errors/server-error';
export const makeCinetpayTransfert = ({
    axios,
    cinetpayLogin
}: any ={}) => {
    return async ({
        id,
        phoneNumber,
        amount
    }) => {
        try {
            const token = await cinetpayLogin
            if (!token) throw new ServerError()
            const prefix = phoneNumber.substring(0,3)
            const phone = phoneNumber.substring(3, phoneNumber.length)
            console.log(prefix, phone)
            const { data } = await axios
            .post('https://client.cinetpay.com/v1/transfer/money/send/contact', {
                token,
                lang: 'en',
                data: {
                    prefix,
                    phone,
                    amount,
                    notify_url: '/' + id,
                    client_transaction_id: id
                }
            })
            console.log(data)
            const balance = data.data.available
            return balance 
        } catch (err) {
            console.log(err.message)
            return null
        }
    }
}