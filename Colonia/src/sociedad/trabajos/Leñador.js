import { Trabajo } from "./Trabajo.js"

export class Leñador extends Trabajo {
    constructor() {
        super()
        this.bonoTala = 2
        this.velocidadTala =1.5
    }
}