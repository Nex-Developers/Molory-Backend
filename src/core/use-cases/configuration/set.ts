import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeSet({
    configurationDb
}: any = {}) {
    if (!configurationDb) throw new ServerError()
    return async ({
        id,
        preferences
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')
        if (!preferences) throw new MissingParamError('preferences')
        preferences.forEach( async preference => await configurationDb.insertOrUpdate({ 
            where: {  userId_preferenceId : { userId: id, preferenceId: preference.id }}, 
            update: { value: preference.value}, 
            create: { userId: id, preferenceId: preference.id,  value: preference.value }
        }))
        const message = { text: "response.add" }
        return { message }
    } 
}