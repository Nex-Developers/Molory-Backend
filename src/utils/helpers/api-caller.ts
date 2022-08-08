import axios from 'axios'
// import { env } from '../../configs/environment'

export default class ApiCaller{


    static async read(url, req) {
        const headers =  { 
            'Content-Type': 'application/json', 
            
            // 'Authorization': 'Bearer ' + await TokenManager.generate({ id: 0, role: 'super'})
        }
        // console.log(url)
        try {
            const { data } = await axios.get(url, { headers, data: req })
            return data
        } catch (err) {
            // console.log(err)
        }
    }

    static async send(url, req) {
        const headers =  { 
            'Content-Type': 'application/json', 
            // 'Authorization': 'Bearer ' +  await TokenManager.generate({ id: 0, role: 'super'})
        }
        // console.log(url)
        try {
            const { data } = await axios.post(url, req, { headers })
            return data
        } catch (err) {
            console.log('error', err.message)
        }
       
    }
}