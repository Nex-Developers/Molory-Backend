import { DbConnection } from "../../../utils/helpers"

export default () => {
    return ({
        travelId,
        rating,
        comment
    }) => {
        console.log('rating')
        const prisma = DbConnection.prisma

        prisma.$transaction( async() => {
            // prisma.diverReview.add({  data: { travel: { connect: { id: travelId }}, rating, comment}})
            return
        })
    }
}