import { Trabajo } from "./Trabajo.js"

export class Leñador extends Trabajo {
    constructor() {
        super()
        this.modificadorDañoTala = 3
        this.modificadorVelocidadTala =0.5
        this.modificadorVelocidad = 3
        this.imagen = "Leñador"
    }
}