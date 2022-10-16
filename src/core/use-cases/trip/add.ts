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
        price,
        stops
    }: any = {}) => {
        if (!userId) throw new MissingParamError('userId')
        // if (!vehicleId) throw new MissingParamError('vehicleId')
        if (!price) throw new MissingParamError('price')
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
                const principal = (departure.principal && arrival.principal)?true:false
                if (departure.address == arrival.address) break
                if (!departure.type) {
                    departure.type = 'departure'
                    departure.principal = false
                }
                if (!arrival.type) {
                    arrival.type = 'arrival'
                    arrival.principal = false
                }
                const {distance, duration} = await calculMatrix({ departure,  arrival })
                // calculPrice({ distance, pricing })
                // const price = distance * 15
                console.log(distance, duration, price)
                routes.push(
                    {
                        distance,
                        duration,
                        price,
                        principal,
                        remainingSeats: seats,
                        stops: {
                            create: [departure, arrival]
                        }
                    }
                )
            }
        }

        const principalRoute = routes.find(route => route.principal);
        const calculatedRoutes = routes.filter(route => !route.principal).map(route => { 
            route.price = Math.ceil(((route.distance/principalRoute.distance)* price)/5) *5
            return route
        })
        calculatedRoutes.unshift(principalRoute);
        console.log(calculatedRoutes);
        const trip = await tripDb.insertOne({ 
            data: {
                userId,
                vehicleId,
                seats,
                remainingSeats: seats,
                departureDate: date,
                departureTime: time,
                routes: {
                    create: calculatedRoutes
                }
            },
            include: {
                routes: {
                    select: {
                        id: true,
                        distance: true,
                        duration: true,
                        principal: true,
                        remainingSeats: true,
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