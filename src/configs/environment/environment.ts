import dotenv from 'dotenv'
dotenv.config()


export default {
    production: false,
    url: 'http://localhost:8086/',
    port: process.env.PORT || 8086,
    lang: {
        default: 'en',
        path: 'languages/'
    },
    logs: {
        file:  'user-logs/data.xlsx'
    },
    db: {
        softDelete: true
    },
    upload: {
        maxSize: 50 * 1024 * 1024,
        path: 'public/uploads/'
    },
    sms : {
        url: process.env.SMS_API_URL,
        token: process.env.SMS_CLIENT_ID,
        key: process.env.SMS_API_KEY,
        sender: process.env.SMS_SENDER_ID
    },
    mail: {
        host:  process.env.SENDER_EMAIL_HOST,
        port: process.env.SENDER_EMAIL_PORT,
        email: process.env.SENDER_EMAIL,
        password: process.env.SENDER_EMAIL_PASSWORD
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    },
    token: {
        expireTime: process.env.TOKEN_EXPIRE_TIME,
        secret: process.env.JWT_SECRET,
    },
    google: {
        apiKey: process.env.GOOGLE_API_KEY,
    }
}