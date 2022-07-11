import environment from "./environment"
import environmentProd from "./environment.prod"

const env = process.env.NOD_ENV=='development'?environment:environmentProd

export {
    env
}