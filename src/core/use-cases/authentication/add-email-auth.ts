import { ServerError, InvalidParamError, MissingParamError } from "../../../utils/errors"

export default function makeAddEmailAuth ({
    userDb,
    generateToken,
    saveTmpToken,
    askToConfirmEmail,
    isValidEmail,
    hashPassword
}: any = {}) {
    if (!userDb || !generateToken || !saveTmpToken || !askToConfirmEmail || ! isValidEmail || !hashPassword) throw new ServerError()
    return async function ({
        id ,
        email,
        password
    }: any = {}) {
        if (! id ) throw new InvalidParamError('token')
        if (!email) throw new MissingParamError('email')
        if (!password) throw new MissingParamError('password')
        if (!isValidEmail({ email }))  throw new InvalidParamError('email')
        const user = await userDb.findFirst({ where: { id }, select: { email: true, password: true, firstName: true, language: true }})
      
        if (user && (user.email || user.password )) {
            const message =  { text: 'error.alreadyDone', params: "all"}
            return { message }
        }
        
        password = await hashPassword({ password })
        const token = await generateToken({ email })
        await saveTmpToken({ token })
        await askToConfirmEmail({ email, token, firstName: user.firstName, lang: user.language })
        await userDb.updateOne({ where: { id }, data: { email, password} })
        const message = { text: 'auth.message.profileUpdated'}
        return { message }
    }
}