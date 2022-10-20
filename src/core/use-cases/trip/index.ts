import { PricingDb, TripDb, VehicleDb } from "../../../db"
import { calculMatrix } from "../../services/map"
import { calculPrice } from "../../services/payment"
import makeAdd from "./add"
import makeConfirm from "./confirm"
import makeEdit from "./edit"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"
import makeRemove from "./remove"

const tripDb = new TripDb()
const vehicleDb = new VehicleDb()
const pricingDb = new PricingDb()

const addTrip = makeAdd({ tripDb, vehicleDb, pricingDb, calculMatrix, calculPrice })
const editTrip = makeEdit({ tripDb })
const listTrips = makeListItems({ tripDb })
const listTripInfos = makeListItemInfos({ tripDb })
const removeTrip = makeRemove({ tripDb })
const confirmTrip = makeConfirm({ tripDb })

export {
    addTrip,
    editTrip,
    listTrips,
    listTripInfos,
    removeTrip,
    confirmTrip
}