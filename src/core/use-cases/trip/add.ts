import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeAdd({
    tripDb,
    // vehicleDb,
    // pricingDb,
    calculMatrix,
    // calculPrice
}: any = {}) {
    if (!tripDb) throw new ServerError()
    return async ({
        userId,
        vehicleId,
        seats,
        date,
        time,
        stops
    }: any = {}) => {
        if (!userId) throw new MissingParamError('userId')
        // if (!vehicleId) throw new MissingParamError('vehicleId')
        if (!seats) throw new MissingParamError('seats')
        if (!date) throw new MissingParamError('date')
        if (!time) throw new MissingParamError('time')
        if (!stops && !stops.length) throw new MissingParamError('stops')
       
        const departures = stops.filter(stop => stop.type === 'departure' ||  stop.type === 'both')
        if(!departures.length) throw new MissingParamError('departure')
        
        const arrivals = stops.filter(stop => stop.type === 'arrival'||  stop.type === 'both')
        if(!arrivals.length) throw new MissingParamError('arrival')
        
        // const vehicle = await vehicleDb.findFirst({ where: { id: vehicleId }})
        // const pricing = await pricingDb.findMany({ where: { vehicleTypeName: vehicle.type }, select: { lowerDistance: true, upperDistance: true, unitPrice: true}})
        const routes = []
         for (const departure of departures ) {
             for ( const arrival of arrivals) {
                if (departure.address == arrival.address) break
                if (departure.type === 'both') {
                    departure.type = 'departure'
                    departure.principal = false
                }
                if (arrival.type === 'both') {
                    arrival.type = 'arrival'
                    arrival.principal = false
                }
                const {distance, duration} = await calculMatrix({ departure,  arrival })
                // calculPrice({ distance, pricing })
                const price = distance * 15
                console.log(distance, duration, price)
                routes.push(
                    {
                        distance,
                        duration,
                        price,
                        stops: {
                            create: [departure, arrival]
                        }
                    }
                )
            }
        }


        const trip = await tripDb.insertOne({ 
            data: {
                userId,
                vehicleId,
                seats,
                remainingSeats: seats,
                departureDate: date,
                departureTime: time,
                routes: {
                    create: routes
                }
            },
            include: {
                routes: {
                    select: {
                        id: true,
                        distance: true,
                        duration: true,
                        price: true,
                        stops: true
                    }
                }
            }
        })
        const message = { text: "response.add" }
        return { message, data: trip }
    } 
}