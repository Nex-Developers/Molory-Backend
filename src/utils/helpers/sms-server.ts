import axios from 'axios'
import { env } from '../../configs/environment'

export default class SmsServer{
    static apiUrl = env.sms.url
    static apiKey = env.sms.key //key
    static apiToken =env.sms.token //secret
    static sender = env.sms.sender

    static async send(phoneNumbers: string[], message) {
        console.log(' production ', env.production)
        // if (env.production) {
            try {
                // const { data } = await axios.post(
                //     SmsServer.apiUrl, 
                //     { 
                //         senderId: SmsServer.sender,
                //         ApiKey: SmsServer.apiKey,
                //         ClientId: SmsServer.apiToken,  
                //         MobileNumbers: phoneNumbers[0],
                //         message,
                //         groupId: '' 
                //     }
                // )
                // return data
                const {data} = await axios.get(`${SmsServer.apiUrl}?key=${SmsServer.apiKey}&secret=${SmsServer.apiToken}&from=${SmsServer.sender}&to=${phoneNumbers[0]}&text=${message}`)
                console.log(data)
                return data

            } catch(e) {
                console.log(e.message)
                return
            }
        // } else {
        //     console.log(message)
        // }
        
       
    }
}