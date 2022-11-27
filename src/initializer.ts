import { Role } from "./core/conventions"
// import { askToConfirmEmail } from "./core/services/email"
// import { generateToken } from "./core/services/token"
import { addUser } from "./core/use-cases/user"
import { UserDb } from "./db"

export default async () => {
    const userDb = new UserDb()
    const admin = await userDb.findFirst({ where: { email: 'developer@nex-softwares.com' }, select: { id: true } })
    if (admin) {
        if (admin.emailVerifiedAt) {
            console.log('Admin already exists')
            return
        }
        // const token = await generateToken({ email: admin.email })
        // await askToConfirmEmail({ email: admin.email, firstName: admin.firstName, token, lang: admin.language })
        userDb.updateOne({ where: { id: admin.id}, data: { emailVerifiedAt: new Date()}})
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
        birthDay: new Date()
    }
    const response = await addUser(data)
    console.log(`--> Admin user created with id: ${response.id}`)

    // task every hour to set all expired trips

}
