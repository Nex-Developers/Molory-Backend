import { PricingDb, VehicleTypeDb } from "../../../db"
import makeAdd from "./add"
import makeEdit from "./edit"
import makeListItemInfos from "./list-item-infos"
import makeListItems from "./list-items"
import makeRemove from "./remove"

const pricingDb = new PricingDb()
const vehicleTypeDb = new VehicleTypeDb()

const addPricing = makeAdd({ pricingDb })
const editPricing = makeEdit({ pricingDb })
const listPricing = makeListItems({ vehicleTypeDb })
const listPricingInfos = makeListItemInfos({ pricingDb })
const removePricing = makeRemove({ pricingDb })

export {
    addPricing,
    editPricing,
    listPricing,
    listPricingInfos,
    removePricing
}