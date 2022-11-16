import moment from "moment";
import { AccountAllReadyExistError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeSignUp({
    userDb,
    askToConfirmEmail,
    isValidEmail,
    hashPassword,
    generateToken,
    saveTmpToken,
    generateOtp,
    saveOtp
}: any = {}) {
    if (!userDb || !askToConfirmEmail || !isValidEmail || !hashPassword || !generateToken || !saveTmpToken || !generateOtp || !saveOtp) throw new ServerError()
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
        console.log('birthDay', birthDay);
        if (!firstName) throw new MissingParamError('firstName')
        if (!lastName) throw new MissingParamError('lastName')
        if (!birthDay) throw new MissingParamError('birthDay')
        const formatedDate = moment(birthDay, 'DD-MM-YYYY').format('MM-DD-YYYY')
        birthDay = new Date(formatedDate)
        // if (!phoneNumber) throw new MissingParamError('phoneNumber')
        if (!email) throw new MissingParamError('email')
        if (!isValidEmail({ email })) throw new InvalidParamError('email')
        if (!password) throw new MissingParamError('password')
        password = await hashPassword({ password })
        try {
            await userDb.insertOne({ data: { firstName, lastName, phoneNumber, email, password, birthDay, role: 'user', language, signUpMethod: "email", gender, profileCompletedAt: new Date(), status: 3 } })
        } catch (err) {
            console.log(err.message);
            throw new AccountAllReadyExistError('email');
        }
        const token = await generateToken({ email })
        const otp = await generateOtp()
        await saveTmpToken({ token })
        await saveOtp({ phoneNumber: email, otp })
        try {
            await askToConfirmEmail({ email, otp, firstName, lastName, lang: language })
        } catch (err) {
            console.log(err.message);
            throw new InvalidParamError('email');
        }
        const message = { text: 'auth.message.register', params: { email } }
        return { token, message }
    }
}
