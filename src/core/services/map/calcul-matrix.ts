export default function makeCalculMatrix({
    gmapCalculDistance,
    latLng
}: any = {}) {
    return async ({
        departure,
        arrival
    }) => {
        const departureLatLng = { lat: departure.latitude, lng:  departure.longitude},
        arrivalLatLng = { lat: arrival.latitude, lng: arrival.longitude }
       const res = await gmapCalculDistance(departureLatLng, arrivalLatLng)
       console.log(res)
       return { distance: Math.round(res.distance.value/1000), duration: Math.round(res.duration.value/(60 * 60)) }
    }
}