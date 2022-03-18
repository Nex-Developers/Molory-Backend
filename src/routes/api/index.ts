import authentication from "./authentication"
import configuration from "./configuration"
import logs from "./logs"
import preference from "./preference"
import pricing from "./pricing"
import user from "./user"
import vehicle from "./vehicle"
import vehicleType from "./vehicle-type"

export default (router) => {
    router.use(logs())
    router.use('/auth', authentication())
    router.use(user())
    router.use(preference())
    router.use(pricing())
    router.use(vehicleType())
    router.use(vehicle())
    router.use(configuration())
    return router
}
