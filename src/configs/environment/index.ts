import environment from "./environment"
import environmentProd from "./environment.prod"

const env = process.env.MY_ENV == 'production' ? environmentProd:environment

export {
    env
}
