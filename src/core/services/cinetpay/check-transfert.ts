export const makeCheckCinetpayTransfert = ({
    axios,
    cinetpayLogin
}: any ={}) => {
    return async ({ id }) => {
        try {
            const token = await cinetpayLogin
            if (!token) return
            const { data } = await axios
            .get('https://client.cinetpay.com/v1/transfer/check/money', {
                token,
                lang: 'en',
                transaction_id: id
            })
            console.log(data)
           return data.data
        } catch (err) {
            console.log(err.message)
            return null
        }
    }
}