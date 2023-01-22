import { ServerError } from './../../../utils/errors/server-error';
import url from 'url'
export const makeCinetpayTransfert = ({
    axios,
    cinetpayLogin
}: any = {}) => {
    return async ({
        id,
        prefix,
        phone,
        amount,
        path
    }) => {
        try {
            const token = await cinetpayLogin()
            if (!token) throw new ServerError()
            console.log(prefix, phone)
            const params = new url.URLSearchParams()
            const q = [{ prefix, phone, amount, notify_url: 'https://molory.xyz/backend/api/' + path , client_transaction_id: id}]
            params.append('data', JSON.stringify(q))
            const { data } = await axios
                .post(`https://client.cinetpay.com/v1/transfer/money/send/contact?token=${token}`, params)
            console.log(data.data[0][0])
            return data.code==0?data.data[0][0].transaction_id:false
        } catch (err) {
            console.log(err.response.data);
            return null
        }
    }
}