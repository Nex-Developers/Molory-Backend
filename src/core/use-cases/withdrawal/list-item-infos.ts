import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    withdrawalDb
}: any = {}) {
    if (!withdrawalDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data = await withdrawalDb.findFirst({
            where: {
                id
            },
            select: {
                type: true,
                method: true,
                amount: true,
                accessNumber: true,
                status: true,
                wallet: {
                    select: {
                        id: true,
                        balance: true,
                        user: {
                            select: {
                                id: true,
                                avatar: true,
                                lastName: true,
                                firstName: true,
                                phoneNumber: true,
                                role: true
                            }
                        }
                    }
                }
            }
        })
        return { data }
    }
}