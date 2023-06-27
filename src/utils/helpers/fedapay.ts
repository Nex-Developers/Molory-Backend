import { FedaPay, Transaction, Webhook } from 'fedapay'

export default class FedapayManager {
    static app
    static async connect(): Promise<any> {
        FedapayManager.app = FedaPay
        // FedapayManager.app.setApi 
        FedaPay.setApiKey("sk_live_5XEQoAGhvm4J0B5bX79A0Qqc")
        FedaPay.setEnvironment("sandbox")
        return
    }

    static async createTransaction(amount: number, firstname: string, lastname: string, email: string, phoneNumber: string) {
        try {
            // FedapayManager.app.setApi 
            FedaPay.setApiKey("sk_live_5XEQoAGhvm4J0B5bX79A0Qqc")
            FedaPay.setEnvironment("live")
            const transaction = await Transaction.create({
                description: 'Description',
                amount,
                // callback_url: 'https://molory.xyz/backend/api/validate-payment',
                currency: {
                    iso: 'XOF'
                },
                customer: {
                    firstname,
                    lastname,
                    email: email || 'aroamadou@gmail.com',
                    phone_number: {
                        number: phoneNumber || '90000000',
                        country: 'TG'
                    }
                }
            });
            // console.log(transaction)
            const token = await transaction.generateToken()
            return { url: token.url, transactionId: transaction.id }
        } catch (err: any) {
            console.log(err);
            return null
        }
    }

    static async verifyTransaction(id: number) {
        FedaPay.setApiKey("sk_live_5XEQoAGhvm4J0B5bX79A0Qqc")
        FedaPay.setEnvironment("live")
        const transaction = await Transaction.retrieve(id)
        return !!(transaction.status == "approved")
    }

    static  decriptEvent(body, sig) {
        const endpointSecret = "wh_live_wWCbnh89F7B6yONm_UlPEq_K";
        let event;
        try {
            event = Webhook.constructEvent(body, sig, endpointSecret);
            console.log(event);
            return event;
        } catch (err) {
            console.log(err.message);
            return err
        }

    }

}
