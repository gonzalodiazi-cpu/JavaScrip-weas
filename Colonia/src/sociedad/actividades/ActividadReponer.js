import { Actividad } from "./Actividad.js"
import { ActividadTransferir } from "./ActividadTransferir.js"
import { ActividadEntregarAAlmacen } from "./ActividadEntregarAAlmacen.js"

export class ActividadReponer extends Actividad {
    constructor(colono, destino, tipo, cantidad) {
        super(colono)

        this.destino = destino
        this.tipo = tipo
        this.cantidad = cantidad
        this.resultado = null
        this.actividadSecundaria = null
    }

    cantidadFaltante() {
        const cantidadInventario =
            this.colono.inventario.consultarCantidad(this.tipo)

        return Math.max(
            0,
            this.cantidad - cantidadInventario
        )
    }

    crearTransferencia() {
        const cantidad = this.cantidadFaltante()

        return new ActividadTransferir(
            this.colono,
            this.colono.colonia.ayuntamiento,
            this.destino,
            this.tipo,
            cantidad
        )
    }

    crearEntrega() {
        return new ActividadEntregarAAlmacen(
            this.colono,
            this.destino,
            this.tipo,
            this.cantidad
        )
    }

    actualizar() {
        if (this.actividadSecundaria !== null) {
            return
        }

        const cantidadFaltante = this.cantidadFaltante()

        if (cantidadFaltante > 0) {
            this.actividadSecundaria =
                this.crearTransferencia()

            this.iniciarActividadSecundaria(
                this.actividadSecundaria
            )

            return
        }

        this.actividadSecundaria =
            this.crearEntrega()

        this.iniciarActividadSecundaria(
            this.actividadSecundaria
        )
    }

    recibirResultadoActividadSecundaria(resultado) {
        super.recibirResultadoActividadSecundaria(resultado)

        this.actividadSecundaria = null

        if (resultado === "Fracaso") {
            this.resultado = "Fracaso"
            this.terminarActividad()
            return
        }

        this.resultado = "Exito"
        this.terminarActividad()
    }

}