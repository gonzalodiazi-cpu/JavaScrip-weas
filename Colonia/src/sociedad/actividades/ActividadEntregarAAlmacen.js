import { Actividad } from "./Actividad.js"

export class ActividadEntregarAAlmacen extends Actividad {
    constructor(colono, objeto, tipo, cantidad) {
        super(colono)

        this.objeto = objeto
        this.tipo = tipo
        this.cantidad = cantidad
        this.resultado = null
        this.almacenamiento = objeto.almacenamiento
    }

    puedeEntregarAAlmacen(almacenamiento, tipo, cantidad) {
        return this.colono.inventario.puedeEntregarAAlmacen(
            almacenamiento,
            tipo,
            cantidad
        )
    }

    entregarAAlmacenamiento(almacenamiento, tipo, cantidad) {
        this.colono.inventario.entregarAAlmacenamiento(
            almacenamiento,
            tipo,
            cantidad
        )
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

    actualizar() {
        if (this.estaEnAlmacenamiento() && this.colono.destino === null) {
            this.entregar()
        }
        else if (this.vaCaminoAlAlmacenamiento()) {
            if (!this.estaEnAlmacenamiento()) {
                return
            }

            this.entregar()
        }
        else {
            this.irAlAlmacenamiento()
        }
    }

    entregar() {
        if (!this.puedeEntregarAAlmacen(
            this.almacenamiento,
            this.tipo,
            this.cantidad
        )) {
            this.resultado = "Fracaso"
            this.terminarActividad()
            return
        }

        this.entregarAAlmacenamiento(
            this.almacenamiento,
            this.tipo,
            this.cantidad
        )

        this.resultado = "Exito"
        this.terminarActividad()
    }
}