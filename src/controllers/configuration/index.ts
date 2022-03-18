import { 
    setConfiguration, 
    listUserConfigurations, 
} from "../../core/use-cases/configuration"
import makeGetItemsController from "./get-items"
import makePostController from "./post"

const postConfigurationController = makePostController({ setConfiguration })
const getConfigurationsController = makeGetItemsController({ listUserConfigurations })


export {
    postConfigurationController,
    getConfigurationsController
}