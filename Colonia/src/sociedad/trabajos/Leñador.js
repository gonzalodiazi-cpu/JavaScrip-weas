import { Trabajo } from "./Trabajo.js"

export class Leñador extends Trabajo {
    constructor() {
        super()
        this.dañoTala = 3
        this.velocidadTala =1.5
    }
}