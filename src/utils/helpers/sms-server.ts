import messagebird from 'messagebird'
import { env } from '../../configs/environment';
import { promisify } from "util"

export default class SmsServer{
    

    static async send(phoneNumbers: string[], message) {
        console.log(env.sms.key)
    const messaging = messagebird.initClient(env.sms.key);
    const params = {
        'originator': env.sms.sender,
        'recipients': phoneNumbers,
        'body': message
        };
        const makeAsync = promisify(messaging.messages.create).bind(messaging.messages)
        try {
            return makeAsync(params)
        } catch (err) {
            console.log('Message bird error: ', err.message)
        }
    }
}
// import axios from 'axios'
// import { env } from '../../configs/environment'

// export default class SmsServer{
//     static apiUrl = env.sms.url
//     static apiKey = env.sms.key //key
//     static apiToken =env.sms.token //secret
//     static sender = env.sms.sender

//     static async send(phoneNumbers: string[], message) {
//         console.log(' production ', env.production)
//         if (env.production) {
//             try {
//                 const { data } = await axios.post(
//                     SmsServer.apiUrl, 
//                     { 
//                         senderId: SmsServer.sender,
//                         ApiKey: SmsServer.apiKey,
//                         ClientId: SmsServer.apiToken,  
//                         MobileNumbers: phoneNumbers[0],
//                         message,
//                         groupId: '' 
//                     }
//                 )
//                 return data
//                 // console.log(message);
//                 // const {data} = await axios.get(`${SmsServer.apiUrl}?key=${SmsServer.apiKey}&secret=${SmsServer.apiToken}&from=${SmsServer.sender}&to=${phoneNumbers[0]}&text=${message}`)
//                 // console.log(data)
//                 // return data

//             } catch(e) {
//                 console.log(e.message)
//                 return
//             }
//         } else {
//             console.log(message)
//         }
        
       
//     }
// }

// import { Vonage } from '@vonage/server-sdk'


// export default class SmsServer {
//     static credentials: any = {
//         apiKey: 'ebf64a21',
//         apiSecret: 'N3VVLO1bogVEPQRS'
//       };
//      static vonage = new Vonage(SmsServer.credentials)
    
//     static async send(phoneNumbers: string[], message) {
//         await SmsServer.vonage.sms.send({to: phoneNumbers[0], from: 'Molory', text: message})
//         .then(resp => { console.log('Message sent successfully'); console.log(resp); return resp })
//         .catch(err => { console.log('There was an error sending the messages.', err.meesage); return});        
        
//     }
// }