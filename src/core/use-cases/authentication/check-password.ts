import { InvalidParamError, MissingParamError, PasswordIncorrectError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeCheckPassword({
    generateToken,
    saveToken,
    removeTmpToken,
    comparePasswords
}: any = {}) {
    if (!generateToken || !saveToken || !removeTmpToken || !comparePasswords) throw new ServerError()
    return async function ({
        token,
        id,
        password,
        device
    }: any = {}) {
        const prisma = DbConnection.prisma
        if (!id) throw new InvalidParamError('Token')
        if (!password) throw new MissingParamError('password')
        if (!device) throw new MissingParamError('device')
        console.log(device)
        console.log(device.id)
        if(!device.id || !device.token) throw new InvalidParamError('device')
        const user = await prisma.user.findFirst({ where: { id } })
        if (! await comparePasswords({ hash: user.password, password })) throw new PasswordIncorrectError('password')
        const savedDevice = await prisma.device.findUnique({ where: { id_userId:{ id: device.id, userId: user.id }} })
        if (!savedDevice) await prisma.device.create({
            data: {
                id: device.id,
                userId: user.id,
                token: device.token,
                platform: device.platform
            }
        })
        else if (savedDevice.token != device.token) await prisma.device.update({ where: { id_userId: { id: device.id, userId: user.id }}, data: { token: device.token, updatedAt: new Date() } })
        const authToken = await generateToken({ id: user.id, role: user.role })
        await saveToken({ token: authToken })
        await removeTmpToken({ token })
        const message = { text: 'auth.message.login' }
        return { token: authToken, message, data: { id: user.id, avatar: user.avatar, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, createdAt: user.createdAt } } 
    }
}
