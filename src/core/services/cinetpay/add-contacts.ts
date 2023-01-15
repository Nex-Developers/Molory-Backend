import { ServerError } from './../../../utils/errors/server-error';
export const makeAddCinetpayContacts = ({
    axios,
    cinetpayLogin
}: any ={}) => {
    return async ({
        phoneNumber,
        lastName,
        firstName,
        email,
    }) => {
        try {
            const token = await cinetpayLogin
            if (!token) throw new ServerError()
            const prefix = phoneNumber.substring(0,3);
            const phone = phoneNumber.substring(3, phoneNumber.length)
            console.log(prefix, phone)
            const name = firstName + ' ' + lastName
            const { data } = await axios
            .post('https://client.cinetpay.com/v1/transfer/check/balance', {
                token,
                lang: 'en',
                data: {
                    prefix,
                    phone,
                    name,
                    surname: '',
                    email
                }
            })
            console.log(data)
            return true 
        } catch (err) {
            console.log(err.message)
            return null
        }
    }
}