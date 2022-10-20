import { RouteDb } from "../../../db"
import makeAdd from "./add"
import makeEdit from "./edit"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"
import makeRemove from "./remove"

const routeDb = new RouteDb()

const addRoute = makeAdd({ routeDb })
const editRoute = makeEdit({ routeDb })
const listRoutes = makeListItems({ routeDb })
const listRouteInfos = makeListItemInfos({ routeDb })
const removeRoute = makeRemove({ routeDb })

export {
    addRoute,
    editRoute,
    listRoutes,
    listRouteInfos,
    removeRoute
}