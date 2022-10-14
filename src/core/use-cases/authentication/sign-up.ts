import { AccountAllReadyExistError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeSignUp({
    userDb,
    askToConfirmEmail,
    isValidEmail,
    hashPassword,
    generateToken,
    saveTmpToken
}: any = {}) {
    if (!userDb || !askToConfirmEmail || !isValidEmail || !hashPassword || !generateToken || !saveTmpToken) throw new ServerError()
    return async function signUp({
        firstName,
        lastName,
        birthDay,
        phoneNumber,
        email,
        password,
        language,
        gender
    }: any = {}) {
        console.log('signup');
        if (!firstName) throw new MissingParamError('firstName')
        if (!lastName) throw new MissingParamError('lastName')
        if (!birthDay) throw new MissingParamError('birthDay')
        if (typeof birthDay == 'string') birthDay = new Date(birthDay)
        // if (!phoneNumber) throw new MissingParamError('phoneNumber')
        if (!email) throw new MissingParamError('email')
        if (!isValidEmail({ email })) throw new InvalidParamError('email')
        if (!password) throw new MissingParamError('password')
        password = await hashPassword({ password })
        try {
            const { id } = await userDb.insertOne({ data: { firstName, lastName, phoneNumber, email, password, birthDay, role: 'user', language, signUpMethod: "email", gender, profileCompletedAt: new Date(), status: 3 } })
            const token = await generateToken({ email })
            await saveTmpToken({ token })
            await askToConfirmEmail({ email, token, firstName, lastName, lang: language })
            const message = { text: 'auth.message.register', params: { email } }
            return { message, data: { id } }
        } catch (err) {
            console.log(err.message);
            throw new AccountAllReadyExistError('email');
        }

    }
}