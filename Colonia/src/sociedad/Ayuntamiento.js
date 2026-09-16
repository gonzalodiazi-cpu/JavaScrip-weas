export class Ayuntamiento {
    constructor(mundo) {
        this.posicion= {
            x : mundo.ancho /2,
            y : mundo.alto/2
        }
        this.capacidadCasas = 2
        this.imagen="Ayuntamiento"
        this.ancho=200
        this.alto=200
    }
}