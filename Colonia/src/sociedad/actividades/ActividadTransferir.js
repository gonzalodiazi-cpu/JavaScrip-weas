import { Actividad } from "./Actividad.js"
import { ActividadRecibirDeAlmacen } from "./ActividadRecibirDeAlmacen.js"
import { ActividadEntregarAAlmacen } from "./ActividadEntregarAAlmacen.js"

export class ActividadTransferir extends Actividad {
    constructor(
        colono,
        origen,
        destino,
        tipo,
        cantidad,
        maquina_transferencia = null
    ) {
        super(colono)

        this.origen = origen
        this.destino = destino
        this.tipo = tipo
        this.cantidad = cantidad
        this.resultado = null
        this.actividadSecundaria = null

        if (maquina_transferencia === "origen") {
            this.origenAlmacenamiento =
                origen.almacenamientoSalida

            this.destinoAlmacenamiento =
                destino.almacenamiento
        }
        else if (maquina_transferencia === "destino") {
            this.origenAlmacenamiento =
                origen.almacenamiento

            this.destinoAlmacenamiento =
                destino.almacenamientoEntrada
        }
        else {
            this.origenAlmacenamiento =
                origen.almacenamiento

            this.destinoAlmacenamiento =
                destino.almacenamiento
        }
    }

    _crearRecepcion() {
        const origen = {
            posicion: this.origen.posicion,
            almacenamiento: this.origenAlmacenamiento
        }

        const condicion = () =>
            (this.destinoAlmacenamiento.consultarCantidadGuardable(this.tipo, this.cantidad)===this.cantidad)

        return new ActividadRecibirDeAlmacen(
            this.colono,
            origen,
            this.tipo,
            this.cantidad,
            condicion
        )
    }

    _crearEntrega() {
        const destino = {
            posicion: this.destino.posicion,
            almacenamiento: this.destinoAlmacenamiento
        }

        return new ActividadEntregarAAlmacen(
            this.colono,
            destino,
            this.tipo,
            this.cantidad
        )
    }

    recibirResultadoActividadSecundaria(resultado) {
        super.recibirResultadoActividadSecundaria(resultado)

        this.actividadSecundaria = null
    }

    _iniciarRecepcion() {
        this.actividadSecundaria =
            this._crearRecepcion()

        this.iniciarActividadSecundaria(
            this.actividadSecundaria
        )
    }

    _iniciarEntrega() {
        this.actividadSecundaria =
            this._crearEntrega()

        this.iniciarActividadSecundaria(
            this.actividadSecundaria
        )
    }

    actualizar() {
        const resultados =
            this.resultadosActividadesSecundarias

        if (resultados.length === 0) {
            this._iniciarRecepcion()
            return
        }

        const ultimoResultado =
            resultados.at(-1)


        if (ultimoResultado === "Fracaso") {
            this.resultado = "Fracaso"
            this.terminarActividad()
            return
        }

        if (resultados.length === 1) {
            this._iniciarEntrega()
            return
        }

        this.resultado = "Exito"
        this.terminarActividad()
    }
}