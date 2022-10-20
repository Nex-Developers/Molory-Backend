import { env } from "../../../configs/environment"

export default function makeGetPaymentState({
    postData
}: any = {}) {
    return async ({
        id
    }) => {
        return await postData(
            env.cinetPay.checkPaymentUrl,
            {
                transaction_id: id,
                site_id: env.cinetPay.siteId,
                apikey: env.cinetPay.apiKey
            }
        )
    }
}