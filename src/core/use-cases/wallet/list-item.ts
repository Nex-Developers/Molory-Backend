import { MissingParamError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

const makeListItem = () => {

    return async ({
        id
    }:  { id: number}) => {
        if (!id) throw new MissingParamError('id')
        const prisma = DbConnection.prisma
        
        const data =  await prisma.wallet.findUnique({ where: { id }, include: {  transactions: true }})
        return { data }
    }
}

export default makeListItem