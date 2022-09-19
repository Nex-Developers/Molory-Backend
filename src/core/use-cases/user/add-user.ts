import { env } from "../../../configs/environment"
import { InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAddUser({
    userDb,
    isValidEmail,
    hashPassword,
    generateToken,
    askToConfirmEmail,
    saveTmpToken
}: any = {}){
    if (!userDb || !isValidEmail || !hashPassword || !generateToken || !askToConfirmEmail || !saveTmpToken) throw new ServerError()
    return async function addUser({
        lastName,
        firstName,
        phoneNumber,
        email,
        birthDay,
        role,
        language,
        password
    }: any = {}){
        if (!lastName) throw new MissingParamError('lastName')
        if (!firstName) throw new MissingParamError('firstName')
        if (!phoneNumber) throw new MissingParamError('phoneNumber')
        if (!email) throw new MissingParamError('email')
        if (! await isValidEmail({ email })) throw new InvalidParamError('email')
        // if (!birthDay) throw new MissingParamError('birthDay')
        if (birthDay && typeof birthDay === 'string') birthDay = new Date(birthDay)
        if (!role) role = 'user'
        if (!language) language = env.lang.default
       password = password? await hashPassword({ password }) : '' 

       const { id } = await userDb.insertOne({ data: {
            lastName,
            firstName,
            phoneNumber,
            email,
            birthDay,
            role,
            language,
            password
        }})
        const token = await generateToken({ email })
        await saveTmpToken({ token  })
        await askToConfirmEmail({ email, token, firstName, lastName, lang: language })
        const message = { text: "response.add"}
        return { message , id }
    } 
}
