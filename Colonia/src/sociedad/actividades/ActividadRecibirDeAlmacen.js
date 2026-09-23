import { Actividad } from "./Actividad.js"

export class ActividadRecibirDeAlmacen extends Actividad {
    constructor(colono, objeto, tipo, cantidad, condicion = null) {
        super(colono)

        this.objeto = objeto
        this.tipo = tipo
        this.cantidad = cantidad
        this.resultado = null
        this.almacenamiento = objeto.almacenamiento
        this.condicion = condicion
    }

    irAlAlmacenamiento() {
        this.colono.establecerDestino(this.objeto.posicion)
    }

    estaEnAlmacenamiento() {
        return this.colono.estaEnPosObj(this.objeto)
    }

    vaCaminoAlAlmacenamiento() {
        return this.colono.destino === this.objeto.posicion
    }

    cumpleCondicion() {
        if (
            this.condicion !== null &&
            !this.condicion()
        ) {
            this.resultado = "Fracaso"
            this.terminarActividad()
            return false
        }

        return true
    }

    actualizar() {
        if (
            this.estaEnAlmacenamiento() &&
            this.colono.destino === null
        ) {
            this.recibir()
        }
        else if (this.vaCaminoAlAlmacenamiento()) {
            if (!this.estaEnAlmacenamiento()) {
                return
            }

            this.recibir()
        }
        else {
            if (!this.cumpleCondicion()) {
                return
            }

            this.irAlAlmacenamiento()
        }
    }

    recibir() {
        if (!this.cumpleCondicion()) {
            return
        }

        if (!this.puedeRecibirDesdeAlmacen(
            this.almacenamiento,
            this.tipo,
            this.cantidad
        )) {
            this.resultado = "Fracaso"
            this.terminarActividad()
            return
        }

        this.recibirDesdeAlmacenamiento(
            this.almacenamiento,
            this.tipo,
            this.cantidad
        )

        this.resultado = "Exito"
        this.terminarActividad()
    }
}