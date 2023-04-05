import { ResourceExpiredError, ResourceNotFoundError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeFind() {
    return async ({
       name
    }) => {
        const prisma = DbConnection.prisma
        const data = await prisma.promotion.findFirst({ where: { name: name.toUpperCase(), deletedAt: null}})
        if (!data) throw new ResourceNotFoundError('Promotion')
        if (!data.status) throw new ResourceExpiredError("Promotion")
        return { data }
    } 
}