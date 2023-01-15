export const makeGetCinetpayBalance = ({
    axios,
    cinetpayLogin
}: any ={}) => {
    return async () => {
        try {
            const token = await cinetpayLogin
            if (!token) return
            const { data } = await axios
            .get('https://client.cinetpay.com/v1/transfer/check/balance', {
                token,
                lang: 'en'
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