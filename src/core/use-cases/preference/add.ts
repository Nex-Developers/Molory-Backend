import { MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeAdd({
    preferenceDb,
    saveProfile
}: any = {}) {
    if (!preferenceDb || !saveProfile) throw new ServerError()
    return async ({
        userId,
        preferences
    }: any = {}) => {
        const prisma = DbConnection.prisma

        if (!userId) throw new MissingParamError('userId')
        return await prisma.$transaction(async () => {
            await prisma.preference.deleteMany({ where: { userId } })
            const promises = await preferences.map(async ({ questionId, answerIndex, answerId }) => {
                if (!questionId) throw new MissingParamError('questionId')
                if (!answerId) {
                    if (answerIndex === undefined || answerIndex === null) throw new MissingParamError('answerIndex')
                    const { id } = await prisma.answer.findFirst({ where: { questionId, index: answerIndex }, select: { id: true}})
                    answerId = id
                    console.log(id)
                }
                return await prisma.preference.create({ data: {
                    user: {
                        connect: { id: userId}
                    },
                    question: {
                        connect: { id: questionId}
                    },
                    answer: {
                        connect: { id: answerId }
                    },
                    answerIndex
                }})
            })
            return Promise.all(promises).then(() => {
                saveProfile(userId)
                const message = { text: "response.add" }
                return { message }
            })
        })
      
       
    }
}   
