import environment from "./environment"
import environmentProd from "./environment.prod"

const env = process.env.NODE_ENV=='production'?environmentProd:environment

export {
    env
}