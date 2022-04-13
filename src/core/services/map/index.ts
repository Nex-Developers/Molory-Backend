import { GoogleMap } from "../../../utils/helpers"
import makeCalculMatrix from "./calcul-matrix"

const calculMatrix = makeCalculMatrix({ gmapCalculDistance: GoogleMap.calculMatrix })

export {
    calculMatrix
}