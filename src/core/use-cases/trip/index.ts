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
import { saveProfile, saveTravel, saveTrip } from "../../services/firebase"
import makeReport from "./report"

const tripDb = new TripDb()
const vehicleDb = new VehicleDb()
const pricingDb = new PricingDb()

const addTrip = makeAdd({ saveProfile, tripDb, vehicleDb, pricingDb, calculMatrix, calculPrice, notifyUser, addTask, saveTrip })
const startTrip = makeStart({ notifyUser, addTask, saveTrip, saveTravel })
const finishTrip = makeFinish({ notifyUser, saveTrip, saveTravel })
const listTrips = makeListItems({ tripDb })
const listTripInfos = makeListItemInfos({ tripDb })
const removeTrip = makeRemove({ tripDb, notifyUser, saveTrip, saveTravel })



const editTrip = makeEdit({ tripDb, saveTrip })
const confirmTrip = makeConfirm({ tripDb })
const tripReport = makeReport({ saveTrip, saveTravel, notifyUser })

export {
    addTrip,
    startTrip,
    finishTrip,    
    editTrip,
    listTrips,
    listTripInfos,
    removeTrip,
    confirmTrip,
    tripReport
}