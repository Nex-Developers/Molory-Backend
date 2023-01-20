import { env } from "../../../configs/environment"

export default ({send}) => {
    return async ({
        timer,
        path,
        params
    }) => {
        return await send(env.taskUrl, { timer, path, params })
    }
}
