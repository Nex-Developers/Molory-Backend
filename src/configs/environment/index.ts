import environment from "./environment"
import environmentProd from "./environment.prod"

const env = process.env.NOD_ENV=='production'?environmentProd:environment

export {
    env
}