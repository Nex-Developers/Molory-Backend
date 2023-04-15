import dotenv from 'dotenv'
dotenv.config()


export default {
    production: process.env.MY_ENV === 'production'?true: false,
    url: process.env.BASE_URL,
    taskUrl: process.env.TASK_URL || 'http://molory-task:8087/api/task',
    port: process.env.PORT || 8086,
    lang: {
        default: 'en',
        path: 'languages/'
    },
    logs: {
        file:  'logs/data.xlsx'
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
        // token: '17005282-216d-46c4-8067-db958f22526d',
        // key: 'qMmBD3wQSgviVmiWxh1Nyhtec',
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
        db: 0
    },
    token: {
        expireTime: process.env.TOKEN_EXPIRE_TIME,
        secret: process.env.JWT_SECRET,
    },
    google: {
        apiKey: process.env.GOOGLE_API_KEY,
    },
    cinetPay: {
        apiKey: process.env.CINET_PAY_KEY,
        siteId: process.env.CINET_PAY_ID,
        checkPaymentUrl: 'https://api-checkout.cinetpay.com/v2/payment/check'
    }
}