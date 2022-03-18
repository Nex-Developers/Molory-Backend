import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    tripDb,
    vehicleDb,
    pricingDb,
    calculMatrix,
    calculPrice
}: any = {}) {
    if (!tripDb) throw new ServerError()
    return async ({
        userId,
        vehicleId,
        seats,
        stops
    }: any = {}) => {
        if (!userId) throw new MissingParamError('userId')
        if (!vehicleId) throw new MissingParamError('vehicleId')
        if (!seats) throw new MissingParamError('seats')
        if (!stops && !stops.length) throw new MissingParamError('stops')
       
        const departures = stops.filter(stop => stop.type === 'departure' ||  stop.type === 'both')
        if(!departures.length) throw new MissingParamError('departure')
        
        const arrivals = stops.filter(stop => stop.type === 'arrival'||  stop.type === 'both')
        if(!arrivals.length) throw new MissingParamError('arrival')
        
        const vehicle = await vehicleDb.findFirst({ where: { id: vehicleId }})
        const pricing = await pricingDb.findMany({ where: { vehicleTypeName: vehicle.type }, select: { lowerDistance: true, upperDistance: true, price: true}})

        const routes = []
        await departures.forEach( departure => {
            arrivals.forEach( async arrival => {
                if (departure.address == arrival.address) return
                const {distance, duration} = await calculMatrix({ departure,  arrival })
                const price = calculPrice({ distance, pricing })
                routes.push(
                    {
                        distance,
                        duration,
                        price,
                        create: {
                            departure,
                            arrival
                        }
                    }
                )
            })
        })
        
        const trip = await tripDb.insertOne({ 
            data: {
                userId,
                vehicleId,
                seats,
                routes: {
                    create: {
                        routes
                    }
                }
            },
            include: {
                routes: {
                    include: {
                        departure: true,
                        arrival: true
                    }
                }
            }
        })

        const message = "response.add"
        return { message, data: trip }
    } 
}