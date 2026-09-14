export class Arbol {
    constructor() {
        this.etapaCrecimiento = 1
        this.madera = 2
        this.durabilidad = 10
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
}