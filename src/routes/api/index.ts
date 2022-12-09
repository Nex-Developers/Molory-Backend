import answer from "./answer"
import authentication from "./authentication"
import configuration from "./configuration"
import logs from "./logs"
import newsletter from "./newsletter"
import notification from "./notification"
import preference from "./preference"
import pricing from "./pricing"
import question from "./question"
import route from "./route"
import travel from "./travel"
import trip from "./trip"
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
    router.use(trip())
    router.use(route())
    router.use(travel())
    router.use(newsletter())
    router.use(question())
    router.use(answer())
    router.use(notification())
    return router
}
