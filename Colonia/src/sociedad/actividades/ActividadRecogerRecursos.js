import { Actividad } from "./Actividad.js"

export class ActividadRecogerRecursos extends Actividad {
    constructor(colono, tipoRecurso = null) {
        super(colono)
        this.tipoRecurso = tipoRecurso
        this.ayuntamiento = colono.colonia.ayuntamiento
    }

    get imagen() {
        return this.colono.trabajo.imagen
    }

    actualizar() {
        if (this.colono.estaEnPosObj(this.ayuntamiento)) {
            this.ayuntamiento.recibirInventario(
                this.colono.inventario
            )

            const recursoDisponible = this.mundo.recursos.some(
                recurso =>
                    (this.tipoRecurso === null || recurso.tipo === this.tipoRecurso) &&
                    !recurso.descartable
            )

            const tieneRecurso = this.colono.inventario.tiene(
                this.tipoRecurso
            )

            if (!recursoDisponible && !tieneRecurso) {
                this.colono.actividad = null
                return
            }
        }

        if (this.colono.objetivo === null) {
            const recursosDisponibles = this.mundo.recursos.filter(
                recurso =>
                    (this.tipoRecurso === null || recurso.tipo === this.tipoRecurso) &&
                    recurso.responsable === null &&
                    !recurso.descartable
            )

            if (recursosDisponibles.length === 0) {
                if (this.colono.inventario.tiene(this.tipoRecurso)) {
                    this.colono.destino =
                        this.ayuntamiento.posicion
                    return
                }

                this.colono.actividad = null
                return
            }

            this.buscarYReservar(recursosDisponibles)

            const cantidadAgregable =
                this.colono.inventario.consultarCantidadGuardable(
                    this.colono.objetivo,
                    this.colono.objetivo.cantidad
                )

            if (cantidadAgregable === 0) {
                this.colono.liberarObjetivo()
                this.colono.destino =
                    this.ayuntamiento.posicion
            }

            return
        }

        this.colono.recoger(this.colono.objetivo)
        this.liberarObjetivoSiDescartable()

        if (this.colono.objetivo === null) {
            return
        }

        const cantidadAgregable =
            this.colono.inventario.consultarCantidadGuardable(
                this.colono.objetivo,
                this.colono.objetivo.cantidad
            )

        if (cantidadAgregable === 0) {
            this.colono.liberarObjetivo()
            this.colono.destino =
                this.ayuntamiento.posicion
        }
    }
    
}