import { Actividad } from "./Actividad.js"

export class ActividadTalarArboles extends Actividad {
    get imagen() {
        return this.colono.trabajo.imagen + "_con_Hacha"
    }

    actualizar() {
        if (this.colono.objetivo === null) {
            const arbolesDisponibles = this.mundo.arboles.filter(
                arbol => arbol.responsable === null && !arbol.descartable
            )

            this.buscarYReservar(arbolesDisponibles)

            return
        }

        this.colono.talar(this.colono.objetivo)
        this.liberarObjetivoSiDescartable()
    }
}