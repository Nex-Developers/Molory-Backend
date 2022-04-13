import { env } from "../../configs/environment"
import {Client, DistanceMatrixRequest, TravelMode, UnitSystem} from "@googlemaps/google-maps-services-js";

export default class GoogleMap {

    static apiKey = env.google.apiKey
    static client = new Client({});

    static async calculMatrix (origin, destination) { 
        const request: DistanceMatrixRequest = {
            params: {
                origins: [origin],
                destinations: [destination],
                mode: TravelMode.driving,
                language: 'fr-FR',
                units: UnitSystem.metric,
                key: GoogleMap.apiKey
            }
        }
        const res = await GoogleMap.client.distancematrix(request)  
        return res.data.rows[0].elements[0]
    }

}