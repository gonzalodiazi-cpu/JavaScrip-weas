import { Almacenamiento } from "../maquinas/Almacenamiento.js"

export class Inventario {
    constructor(estadisticas) {
        this.estadisticas = estadisticas
        this.almacenamiento = new Almacenamiento(new Map(), 1, true)
    }

    get cantidadSlotsInventario() {
        return this.estadisticas.cantidadSlotsInventario
    }

    get capacidadSlotsInventario() {
        return this.estadisticas.capacidadSlotsInventario
    }

    _consultarCapacidadParaGuardar(tipo) {
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

        return (
            this.cantidadSlotsInventario - slotsOcupados
        ) * this.capacidadSlotsInventario
    }

    _actualizarCapacidades() {
        for (const tipo of this.almacenamiento.consultarTipos()) {
            const capacidad = this._consultarCapacidadParaGuardar(tipo)

            this.almacenamiento.establecerCapacidad(tipo, capacidad)
        }
    }

    consultarCantidadGuardable(tipo, cantidadSolicitada) {
        cantidadSolicitada = Math.max(0, cantidadSolicitada)

        const capacidadTotal =
            this._consultarCapacidadParaGuardar(tipo)

        const cantidadActual =
            this.almacenamiento.consultarCantidad(tipo)

        const espacioDisponible =
            Math.max(0, capacidadTotal - cantidadActual)

        return Math.min(
            cantidadSolicitada,
            espacioDisponible
        )
    }

    consultarCantidadSacable(tipo, cantidadSolicitada) {
        return this.almacenamiento.consultarCantidadSacable(
            tipo,
            cantidadSolicitada
        )
    }


    consultarCantidad(tipo) {
        return this.almacenamiento.consultarCantidad(tipo)
    }

    tiene(tipo, cantidad = 1) {
        return this.almacenamiento.tiene(tipo, cantidad)
    }

    guardar(tipo, cantidad) {
        const capacidad = this._consultarCapacidadParaGuardar(tipo)

        this.almacenamiento.establecerCapacidad(tipo, capacidad)
        this.almacenamiento.guardar(tipo, cantidad)

        this._actualizarCapacidades()
    }

    sacar(tipo, cantidad) {
        this.almacenamiento.sacar(tipo, cantidad)
        this._actualizarCapacidades()
    }

    puedeRecibirDesdeAlmacen(almacenamiento, tipo, cantidad) {
        return (
            almacenamiento.consultarCantidadSacable(tipo, cantidad) === cantidad &&
            this.consultarCantidadGuardable(tipo, cantidad) === cantidad
        )
    }

    puedeEntregarAAlmacen(almacenamiento, tipo, cantidad) {
        return (
            this.consultarCantidadSacable(tipo, cantidad) === cantidad &&
            almacenamiento.consultarCantidadGuardable(tipo, cantidad) === cantidad
        )
    }

    recogerRecurso(recurso, cantidadSolicitada = recurso.cantidad) {
        const cantidadGuardable =
            this.consultarCantidadGuardable(
                recurso.tipo,
                Math.min(cantidadSolicitada, recurso.cantidad)
            )

        this.guardar(recurso.tipo, cantidadGuardable)
        recurso.cantidad -= cantidadGuardable
    }

    recibirDesdeAlmacenamiento(almacenamiento, tipo, cantidad) {
        if (!this.puedeRecibirDesdeAlmacen(
            almacenamiento,
            tipo,
            cantidad
        )) {
            return
        }

        almacenamiento.sacar(tipo, cantidad)
        this.guardar(tipo, cantidad)
    }

    entregarAAlmacenamiento(almacenamiento, tipo, cantidad) {
        if (!this.puedeEntregarAAlmacen(
            almacenamiento,
            tipo,
            cantidad
        )) {
            return
        }

        this.sacar(tipo, cantidad)
        almacenamiento.guardar(tipo, cantidad)
    }
}