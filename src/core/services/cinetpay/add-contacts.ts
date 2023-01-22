import { ServerError } from './../../../utils/errors/server-error';
import url from 'url'

export const makeAddCinetpayContacts = ({
    axios,
    cinetpayLogin
}: any ={}) => {
    return async ({
        phone,
        prefix,
        lastName,
        firstName,
        email,
    }) => {
        try {
            const token = await cinetpayLogin()
            console.log(token)
            if (!token) throw new ServerError()
            console.log(prefix, phone)
            const name = firstName + ' ' + lastName
            const params = new url.URLSearchParams()
            if (!email) email = "noemail@molory.com"
            const q = [{ prefix, phone, name, email, surname: firstName}]
            params.append('data', JSON.stringify(q))
            const {data} = await axios
            .post(`https://client.cinetpay.com/v1/transfer/contact?token=${token}`, params)
            return data.code==0?true:false
        } catch (err) {
            console.log(err.response.data);
            return null
        }
    }
}