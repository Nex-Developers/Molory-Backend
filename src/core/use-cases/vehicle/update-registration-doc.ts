import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeUpdateRegistrationDoc ({
    vehicleDb
}: any = {}) {
    if (!vehicleDb) throw new ServerError()
    return async function ({
         id,
        file
    }: any = {}) {
        if (!id) throw new MissingParamError('id')
        if (!file || file == {}) throw new MissingParamError('file')
        // const vehicle = await vehicleDb.findFirst({ where: { id }, select: { registrationDoc: true}})
        // if (user.avatar) deleteAvatarFile(user.avatar)
        const registrationDoc = file.path.substring(file.path .indexOf("/"));
        vehicleDb.updateOne({ where: { id },  data: { registrationDoc }})
        const message = { text: 'response.edit.' }
        return { message, registrationDoc }
    }
}