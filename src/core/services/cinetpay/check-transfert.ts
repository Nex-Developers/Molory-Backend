export const makeCheckCinetpayTransfert = ({
    axios,
    cinetpayLogin
}: any ={}) => {
    return async ({ id }) => {
        try {
            const token = await cinetpayLogin()
            if (!token) return
            const { data } = await axios
            .get(`https://client.cinetpay.com/v1/transfer/check/money?token=${token}&transaction_id=${id}`)
            // console.log(data)
            let res
            if (data.code == 0) res = data.data[0]
           return res
        } catch (err) {
            console.log(err.message)
            return null
        }
    }
}