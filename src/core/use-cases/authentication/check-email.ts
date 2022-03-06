import { ServerError, MissingParamError, InvalidParamError, UnauthorizedError } from "../../../utils/errors"

export default function makeCheckEmail({
    userDb,
    generateToken,
    saveTmpToken
}: any = {}) {
    if (!userDb  || !generateToken || !saveTmpToken) throw new ServerError()
    return async function ({
        email
    }: any = {}) {
        if (!email) throw new MissingParamError('email')
        const user = await userDb.findFirst({ where: { email }, select: { id: true, emailVerifiedAt: true }})
        if (!user) throw new InvalidParamError('email')
        if (!user.emailVerifiedAt) throw new UnauthorizedError()
        const token =  await generateToken({ id: user.id })
        await saveTmpToken({ token })
        const message = { text: 'auth.message.checkEmail' }
        return { token, message }
    }
}
