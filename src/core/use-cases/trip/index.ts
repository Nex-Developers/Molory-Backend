import { PricingDb, TripDb, VehicleDb } from "../../../db"
import { calculMatrix } from "../../services/map"
import { notifyUser } from "../../services/notifications"
import { calculPrice } from "../../services/payment"
import { addTask } from "../../services/task"
import makeAdd from "./add"
import makeConfirm from "./confirm"
import makeEdit from "./edit"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"
import makeRemove from "./remove"
import makeStart from "./start"
import makeFinish from "./finish"
import { saveProfile } from "../../services/firebase"

const tripDb = new TripDb()
const vehicleDb = new VehicleDb()
const pricingDb = new PricingDb()

const addTrip = makeAdd({ saveProfile, tripDb, vehicleDb, pricingDb, calculMatrix, calculPrice, notifyUser, addTask })
const startTrip = makeStart({ notifyUser, addTask })
const finishTrip = makeFinish({ notifyUser })
const listTrips = makeListItems({ tripDb })
const listTripInfos = makeListItemInfos({ tripDb })
const removeTrip = makeRemove({ tripDb, notifyUser })



const editTrip = makeEdit({ tripDb })
const confirmTrip = makeConfirm({ tripDb })

export {
    addTrip,
    startTrip,
    finishTrip,    
    editTrip,
    listTrips,
    listTripInfos,
    removeTrip,
    confirmTrip
}