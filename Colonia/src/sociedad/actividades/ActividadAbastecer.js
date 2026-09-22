import { Actividad } from "./Actividad.js"

export class ActividadAbastecer extends Actividad {
    constructor(colono, maquina, tipoRecurso) {
        super(colono)
        this.maquina = maquina
        this.tipoRecurso = tipoRecurso
    }

    actualizar() {
        if (this.colono.estaEnPosObj(this.maquina)) {
            this.colono.abastecer(
                this.maquina,
                this.tipoRecurso
            )
            return
        }

        this.colono.establecerDestino(
            this.maquina.posicion
        )
    }
}