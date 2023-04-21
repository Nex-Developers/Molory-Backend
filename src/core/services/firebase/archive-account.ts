import { MissingParamError, ServerError } from "../../../utils/errors";

export default function makeSaveProfile({
    getByDoc,
    getInCollection,
    set,
    setInCollection
}: any = {}) {
    if (!getByDoc || !getInCollection || !set || !setInCollection) throw new ServerError()
    return async ({
        id
    }) => {
        if (!id) throw new MissingParamError('id')

    }
}
