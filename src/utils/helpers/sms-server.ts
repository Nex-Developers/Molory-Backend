import axios from 'axios'
import { env } from '../../configs/environment'

export default class SmsServer{
    static apiUrl = env.sms.url
    static apiKey = env.sms.key
    static apiToken =env.sms.token
    static sender = env.sms.sender

    static async send(phoneNumbers: string[], message) {
        console.log(message)
        const { data } = await axios.post(
            SmsServer.apiUrl, 
            { 
                senderId: SmsServer.sender,
                ApiKey: SmsServer.apiKey,
                ClientId: SmsServer.apiToken,  
                MobileNumbers: phoneNumbers[0],
                message,
                groupId: '' 
            }
        )
        console.log(data)
        return data
    }
}