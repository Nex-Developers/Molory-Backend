import { RouteDb, StopDb } from "../../../db"
import makeAdd from "./add"
import makeEdit from "./edit"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"
import makeRemove from "./remove"

const stopDb = new StopDb()
const routeDb = new RouteDb()

const addStop = makeAdd({ stopDb })
const editStop = makeEdit({ stopDb })
const listStops = makeListItems({ routeDb })
const listStopInfos = makeListItemInfos({ stopDb })
const removeStop = makeRemove({ stopDb })

export {
    addStop,
    editStop,
    listStops,
    listStopInfos,
    removeStop
}