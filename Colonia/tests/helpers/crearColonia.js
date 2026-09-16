import { Mundo } from "../../src/mundo/Mundo"
import { Colonia} from "../../src/sociedad/Colonia"


export function crearColonia() {
    const mundo = new Mundo(1200, 800)
    return new Colonia(mundo)
}