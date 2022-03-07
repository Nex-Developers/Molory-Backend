import axios from 'axios'
import { env } from '../../configs/environment'

export default class SmsServer{
    static apiUrl = env.sms.url
    static apiKey = env.sms.key
    static apiToken =env.sms.token
    static sender = env.sms.sender

    static async send(phoneNumbers: string[], message) {
        const { data } = await axios.post(
            this.apiUrl, 
            { 
                senderId: SmsServer.sender,
                ApiKey: SmsServer.apiKey,
                ClientId: SmsServer.apiToken,  
                MobileNumbers: phoneNumbers,
                message 
            }
        )
        return data
    }
}