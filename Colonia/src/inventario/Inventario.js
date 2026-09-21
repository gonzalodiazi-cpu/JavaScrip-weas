import { Almacenamiento } from "../maquinas/Almacenamiento.js"

export class Inventario {
    constructor(estadisticas) {
        this.estadisticas = estadisticas
        this.almacenamiento = new Almacenamiento(new Map(),1,true)
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
            this.almacenamiento.consultarCantidad(recurso.tipo)

        let slotsOcupados = 0
        for (const tipo of this.almacenamiento.consultarTipos()) {
            const cantidad =
                this.almacenamiento.consultarCantidad(tipo)

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
        const cantidadAgregable =
            this.consultarCantidadAgregable(
                recurso,
                cantidadSolicitada
            )

        this.guardarTipo(recurso.tipo, cantidadAgregable)
        recurso.cantidad -= cantidadAgregable
    }
    tiene(tipo, cantidad) {
        return this.almacenamiento.tiene(tipo, cantidad)
    }

    consultarCantidad(tipo) {
        return this.almacenamiento.consultarCantidad(tipo)
    }

    guardarTipo(tipo, cantidad) {
        let slotsOcupados = 0

        for (const otroTipo of this.almacenamiento.consultarTipos()) {
            if (otroTipo !== tipo) {
                const cantidadActual =
                    this.almacenamiento.consultarCantidad(otroTipo)

                slotsOcupados += Math.ceil(
                    cantidadActual / this.capacidadSlotsInventario
                )
            }
        }

        const capacidad =
            (this.cantidadSlotsInventario - slotsOcupados) *
            this.capacidadSlotsInventario

        this.almacenamiento.establecerCapacidad(tipo, capacidad)
        this.almacenamiento.guardar(tipo, cantidad)

        this._actualizarCapacidades()
    }

    sacar(tipo, cantidad) {
        this.almacenamiento.sacar(tipo, cantidad)
        this._actualizarCapacidades()
    }

    eliminarTipo(tipo) {
        const cantidad =
            this.almacenamiento.consultarCantidad(tipo)

        this.sacar(tipo, cantidad)
    }

    _actualizarCapacidades() {
        for (const tipo of this.almacenamiento.consultarTipos()) {
            let slotsOcupados = 0

            for (const otroTipo of this.almacenamiento.consultarTipos()) {
                if (otroTipo !== tipo) {
                    const cantidad =
                        this.almacenamiento.consultarCantidad(otroTipo)

                    slotsOcupados += Math.ceil(
                        cantidad / this.capacidadSlotsInventario
                    )
                }
            }

            const capacidad =
                (this.cantidadSlotsInventario - slotsOcupados) *
                this.capacidadSlotsInventario

            this.almacenamiento.establecerCapacidad(tipo, capacidad)
        }
    }
        
}