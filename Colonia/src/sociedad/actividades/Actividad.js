export class Actividad {
    constructor(colono) {
        this.colono = colono
        this.mundo = colono.colonia.mundo
    }

    get imagen() {
        return this.colono.trabajo.imagen
    }

    buscarYReservar(objetos) {
        this.colono.buscarOptimo(objetos)

        if (this.colono.objetivo !== null) {
            this.colono.objetivo.asignarResponsable(this.colono)
        }
    }

    liberarObjetivoSiDescartable() {
        if (this.colono.objetivo?.descartable) {
            this.colono.liberarObjetivo()
        }
    }
}