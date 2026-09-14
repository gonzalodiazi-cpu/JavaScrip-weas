export class Arbol {
    constructor() {
        this.etapaCrecimiento = 1
        this.madera = 2
    }
    crecer() {
        this.etapaCrecimiento +=1
        if (this.etapaCrecimiento == 2) {
            this.madera = 3
        }
        if (this.etapaCrecimiento == 3) {
            this.madera = 10
        }
    }
}