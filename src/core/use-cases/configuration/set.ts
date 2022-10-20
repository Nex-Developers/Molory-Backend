import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeSet({
    userDb
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async ({
        id,
        preferences
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')
        if (!preferences) throw new MissingParamError('preferences')
        
        const create = preferences.map( preference => ({ id: preference.id }))
        await userDb.updateOne({ where: { id }, data: { preferences: { set: []}}})
        await userDb.updateOne({ where:  { id }, data: { preferences: { connect: create }}})
        const message = { text: "response.edit" }
        return { message }
    } 
}
