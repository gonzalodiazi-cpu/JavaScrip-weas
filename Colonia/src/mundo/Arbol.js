import { Recurso } from "./Recurso"
export class Arbol {
    constructor(posicion) {
        this.etapaCrecimiento = 1
        this.madera = 2
        this.durabilidad = 10
        this.talado = false
        this.posicion=posicion
    }
    crecer() {

        if (this.etapaCrecimiento == 3) {
            return
        }

        this.etapaCrecimiento +=1

        if (this.etapaCrecimiento == 2) {
            this.madera = 3
            this.durabilidad = 20
        }
        if (this.etapaCrecimiento == 3) {
            this.madera = 10
            this.durabilidad = 50
        }
    }
    talar(daño) {
        if (daño>=this.durabilidad) {
            this.durabilidad = 0
            this.talado = true
        }
        else {
            this.durabilidad -=daño
        }
    }
}