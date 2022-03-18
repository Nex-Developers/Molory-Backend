import { ConfigurationDb } from "../../../db"
import makeSet from "./set"
import makeListItems from "./list-user-items"

const configurationDb = new ConfigurationDb()

const setConfiguration = makeSet({ configurationDb })
const listUserConfigurations = makeListItems({ configurationDb })

export {
    setConfiguration,
    listUserConfigurations
}