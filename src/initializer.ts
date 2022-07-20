import { Role } from "./core/conventions"
import { addUser } from "./core/use-cases/user"
import { UserDb } from "./db"

export default async () => {
    const userDb = new UserDb()
    const admin = await userDb.findFirst({ where: { email: 'developer@nex-softwares.com' }, select: { id: true }})
    if (!admin) {
        const data = {
            email: 'developer@nex-softwares.com',
            password: 'Nex@2022',
            role: Role.ADMIN,
            firstName: 'Admin',
            lastName: 'NEX',
            phoneNumber: '22890909090',
            language: 'en',
            emailVerifiedAt: new Date(),
            birthDay: new Date()
        }
        const response = await addUser(data)
       console.log(`--> Admin user created with id: ${response.id}`)
    } else {
        console.log(`--> Admin user already exists`)
    }

}
