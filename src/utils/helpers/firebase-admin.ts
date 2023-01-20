import * as admin from 'firebase-admin'
import fs from 'fs'
import { messaging } from "firebase-admin";
import { MessagingOptions, MessagingPayload } from "firebase-admin/lib/messaging/messaging-api";

export default class FirebaseAdmin{
    static app
    static async connect(): Promise<any> {  
        const serviceAccountData = fs.readFileSync('firebase/service-account-key.json')  
        const serviceAccount = JSON.parse(serviceAccountData.toString())
        FirebaseAdmin.app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as any)
        });
        return
    }

    static async sendNotification(tokens, title, body, data, picture) {
        console.log(data)
        const payload: MessagingPayload = {
            notification: {
                title,
                body,
                sound: 'default',
                badge: '1',
            },
        }
        if (data) payload.data = data
        const options: MessagingOptions = {
            priority: 'high',
            timeToLive: 60 * 60 * 24
        }
        return await  messaging(FirebaseAdmin.app).sendToDevice(tokens, payload, options)
    }

}
