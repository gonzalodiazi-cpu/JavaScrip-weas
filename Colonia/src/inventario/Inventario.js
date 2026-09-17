export class Inventario {
    constructor(estadisticas) {
        this.estadisticas = estadisticas
        this.recursos = new Map()
    }

    get cantidadSlotsInventario() {
        return this.estadisticas.cantidadSlotsInventario
    }
    get capacidadSlotsInventario() {
        return this.estadisticas.capacidadSlotsInventario
    }

    consultarCantidadAgregable(recurso, cantidadSolicitada) {
        let cantidadAgregable = Math.min(cantidadSolicitada, recurso.cantidad)

        const cantidadActualRecursoSolicitado =
            this.recursos.get(recurso.tipo) ?? 0

        let slotsOcupados = 0
        for (const cantidad of this.recursos.values()) {
            slotsOcupados += Math.ceil(
                cantidad / this.capacidadSlotsInventario
            )
        }

        const slotsLibres =
            this.cantidadSlotsInventario - slotsOcupados

        const espacioSlotsLibres =
            slotsLibres * this.capacidadSlotsInventario

        const resto =
            cantidadActualRecursoSolicitado % this.capacidadSlotsInventario

        let espacioUltimoSlot = 0
        if (resto !== 0) {
            espacioUltimoSlot =
                this.capacidadSlotsInventario - resto
        }

        const capacidadTotal =
            espacioSlotsLibres + espacioUltimoSlot

        cantidadAgregable =
            Math.min(capacidadTotal, cantidadAgregable)

        return cantidadAgregable
    }

    agregar(recurso, cantidadSolicitada = recurso.cantidad) {
        const cantidadInicial = this.recursos.get(recurso.tipo) ?? 0
        const cantidadAgregable =
            this.consultarCantidadAgregable(recurso, cantidadSolicitada)

        const cantidadNueva = cantidadInicial + cantidadAgregable

        this.recursos.set(recurso.tipo, cantidadNueva)
        recurso.cantidad -= cantidadAgregable
    }

    sacar(tipo, cantidadSolicitada) {
        const cantidadActual = this.recursos.get(tipo)

        if (cantidadActual === undefined) {
            return
        }

        if (cantidadSolicitada<=0) {
                    return
        }

        if (cantidadSolicitada >= cantidadActual) {
            this.recursos.delete(tipo)
            return
        }

        

        this.recursos.set(tipo, cantidadActual - cantidadSolicitada)
    }
    sacarTipo(tipo) {
        const cantidad = this.recursos.get(tipo)
        this.sacar(tipo, cantidad)
    }
    vaciar() {
        this.recursos.clear()
    }
}