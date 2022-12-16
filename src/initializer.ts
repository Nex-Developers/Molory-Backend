import { Role } from "./core/conventions"
import { hashPassword } from "./core/services/password"
// import { askToConfirmEmail } from "./core/services/email"
// import { generateToken } from "./core/services/token"
import { UserDb } from "./db"
// import * as cron from "node-cron"

export default async () => {
    const userDb = new UserDb()
    const admin = await userDb.findFirst({ where: { email: 'developer@nex-softwares.com' }, select: { id: true } })
    if (admin) {
        if (admin.emailVerifiedAt) {
            console.log('Admin already exists')
            return
        }
        userDb.updateOne({ where: { id: admin.id }, data: { emailVerifiedAt: new Date() } })
        return
    }
    const data = {
        email: 'developer@nex-softwares.com',
        password: 'Nex@2022',
        role: Role.ADMIN,
        firstName: 'Admin',
        lastName: 'NEX',
        phoneNumber: '22890909090',
        language: 'en',
        birthDay: new Date('01-01-1990')
    }
    data.password = await hashPassword({ password: data.password })
    const response = await userDb.insertOne({ data, include: null })
    console.log(`--> Admin user created with id: ${response.id}`)
    return
}
