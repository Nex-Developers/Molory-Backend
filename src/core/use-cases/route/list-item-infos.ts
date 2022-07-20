import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListItemInfos({
    routeDb
}: any = {}) {
    if (!routeDb) throw new ServerError()
    return async ({
        id
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')

        const data = await routeDb.findFirst({ 
            where: {
                id
            }, 
            select: {
                trip:{
                    select: {
                        id: true,
                        seats: true,
                        reamingSeats: true,
                        status: true,
                        departureDate: true,
                        departureTime: true,
                        user: {
                            select: {
                                id: true,
                                avatar:true,
                                lastName: true,
                                firstName: true,
                                gender: true,
                                idCardStatus: true,
                                driverLicenseStatus: true,
                                rating: true,
                                preferences: true
                            }
                        },
                        vehicle: {
                            select: {
                                id: true,
                                type: true,
                                color: true,
                                numberPlate: true,
                                registrationDoc: true
                            }
                        }
                    }
                }, 
                stops: true
            }
        })
        return { data }
    } 
}