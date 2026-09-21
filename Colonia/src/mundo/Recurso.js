export class Recurso {
    constructor(tipo, cantidad, posicion) {
        this.tipo = tipo.charAt(0).toUpperCase() + tipo.slice(1)
        this.cantidad=cantidad
        this.posicion=posicion
        this.ancho=50
        this.alto=50
        this.responsable=null
    }

    get descartable() {
        return this.cantidad<=0
    }

    get imagen() {
        return this.tipo
    }

    asignarResponsable(colono) {
        this.responsable = colono
    }

    liberarResponsable() {
        this.responsable = null
    }
}