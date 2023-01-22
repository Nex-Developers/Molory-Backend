import url from 'url'
export const makeCinetpayLogin = ({
    axios
}: any ={}) => {
    return async () => {
        try {

            const params = new url.URLSearchParams()
            params.append('apikey','202727395961cc8f44680c85.81568028')
            params.append('password','$cAX5tX$g4CAQb5H')
            const { data } = await axios
            .post('https://client.cinetpay.com/v1/auth/login', params)
            const token = data.data.token
            console.log(token)
            return token 
        } catch (err) {
            console.log(err.message)
            return null
        }
    }
}