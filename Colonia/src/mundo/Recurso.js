export class Recurso {
    constructor(tipo, cantidad, posicion) {
        this.tipo = tipo
        this.cantidad=cantidad
        this.posicion=posicion
        this.ancho=50
        this.alto=50
    }

    get imagen() {
        return this.tipo.charAt(0).toUpperCase() + this.tipo.slice(1)
    }
}