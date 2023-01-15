export const makeCinetpayLogin = ({
    axios
}: any ={}) => {
    return async () => {
        try {

            const { data } = await axios
            .post('https://client.cinetpay.com/v1/auth/login', {
                apiKey: '202727395961cc8f44680c85.81568028',
                password: '$cAX5tX$g4CAQb5H'
            })
            console.log(data)
            const token = data.data.token
            return token 
        } catch (err) {
            console.log(err.message)
            return null
        }
    }
}