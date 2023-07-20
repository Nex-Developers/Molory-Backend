import { AccountAllReadyExistError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeSignUp({
    askToConfirmEmail,
    isValidEmail,
    hashPassword,
    generateToken,
    saveTmpToken,
    generateOtp,
    saveOtp,
    saveProfile
}: any = {}) {
    if (!askToConfirmEmail || !isValidEmail || !hashPassword || !generateToken || !saveTmpToken || !generateOtp || !saveOtp || !saveProfile) throw new ServerError()
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
        const prisma = DbConnection.prisma
        if (!firstName) throw new MissingParamError('firstName')
        if (!lastName) throw new MissingParamError('lastName')
        if (!birthDay) throw new MissingParamError('birthDay')
        const formatedDateArray = birthDay.split('-')
        const fomatedDate = [formatedDateArray[1], formatedDateArray[0], formatedDateArray[2]].join('-')
        birthDay = new Date(fomatedDate)
        // if (!phoneNumber) throw new MissingParamError('phoneNumber')
        if (!email) throw new MissingParamError('email')
        if (!isValidEmail({ email })) throw new InvalidParamError('email')
        if (!password) throw new MissingParamError('password')
        password = await hashPassword({ password })
        return await prisma.$transaction(async () => {
            let user
            try {
                user = await prisma.user.create({ data: { firstName, lastName, phoneNumber, email, password, birthDay, role: 'user', language, signUpMethod: "email", gender, profileCompletedAt: new Date(), status: 3 } })
                 await prisma.wallet.create({data: { id: user.id }})
                } catch (err) {
                console.log(err.message);
                throw new AccountAllReadyExistError('email');
            }
            const token = await generateToken({ email })
            const otp = await generateOtp()
            await saveTmpToken({ token })
            await saveOtp({ phoneNumber: email, otp })
            await saveProfile(user.id)
            try {
                await askToConfirmEmail({ email, otp, firstName, lastName, lang: language })
            } catch (err) {
                console.log(err.message);
                throw new InvalidParamError('email');
            }
            const message = { text: 'auth.message.register', params: { email } }
            return { token, message }
        })

    }
}
