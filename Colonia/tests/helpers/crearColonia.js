import { Colonia} from "../../src/sociedad/Colonia"
import { crearMundo } from "./crearMundo.js"


export function crearColonia() {
    const mundo = crearMundo()
    return new Colonia(mundo)
}