import { listRouteInfos, listRoutes } from "../../core/use-cases/route"
import makeGetItemController from "./get-item"
import makeGetItemsController from "./get-items"

const getRouteController = makeGetItemController({ listRouteInfos })
const getRoutesController = makeGetItemsController({ listRoutes })

export {
    getRouteController,
    getRoutesController
}
