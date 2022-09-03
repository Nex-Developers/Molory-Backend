import { 
    ConfigurationDb, 
    UserDb } from "../../../db"
import makeSet from "./set"
import makeListItems from "./list-user-items"

const configurationDb = new ConfigurationDb()
const userDb = new UserDb()

const setConfiguration = makeSet({ userDb })
const listUserConfigurations = makeListItems({ configurationDb })

export {
    setConfiguration,
    listUserConfigurations
}