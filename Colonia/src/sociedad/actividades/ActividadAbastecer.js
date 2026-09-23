import { Actividad } from "./Actividad.js"
import { ActividadReponer } from "./ActividadReponer.js"

export class ActividadAbastecer extends Actividad {
    constructor(colono, maquina = null) {
        super(colono)

        this.maquina = maquina
        this.resultado = null
        this.actividadSecundaria = null
    }

    buscarMaquina() {
        const maquinas = this.colono.colonia.maquinas

        for (const maquina of maquinas) {
            if (
                maquina.responsable === null &&
                this.maquinaPuedeSerAbastecida(maquina)
            ) {
                this.maquina = maquina
                maquina.asignarResponsable(this.colono)
                return
            }
        }
    }

    maquinaPuedeSerAbastecida(maquina) {
        return (
            maquina.receta !== undefined &&
            maquina.almacenamientoEntrada !== undefined
        )
    }

    consultarCantidadNecesaria(almacenamiento, tipo) {
        return almacenamiento.consultarCantidadGuardable(
            tipo,
            Infinity
        )
    }

    tiposNecesarios() {
        return this.maquina.receta.entradas.keys()
    }

    _buscarTipoPendiente() {
        const almacenamiento =
            this.maquina.almacenamientoEntrada

        for (const tipo of this.tiposNecesarios()) {
            const cantidad = this.consultarCantidadNecesaria(
                almacenamiento,
                tipo
            )

            if (cantidad > 0) {
                return {
                    tipo: tipo,
                    cantidad: cantidad
                }
            }
        }

        return null
    }

    _crearReposicion(tipo, cantidad) {
        const destino = {posicion: this.maquina.posicion, almacenamiento:this.maquina.almacenamientoEntrada}
        return new ActividadReponer(
            this.colono,
            destino,
            tipo,
            cantidad
        )
    }

    _iniciarReposicion(tipo, cantidad) {
        this.actividadSecundaria =
            this._crearReposicion(tipo, cantidad)

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
        }
    }

    actualizar() {
        if (this.maquina === null) {
            this.buscarMaquina()

            if (this.maquina === null) {
                this.resultado = "Fracaso"
                this.terminarActividad()
                return
            }
        }

        const resultados =
            this.resultadosActividadesSecundarias

        if (resultados.length > 0) {
            const ultimoResultado = resultados.at(-1)

            if (ultimoResultado === "Fracaso") {
                this.resultado = "Fracaso"
                this.terminarActividad()
                return
            }
        }

        const pendiente = this._buscarTipoPendiente()

        if (pendiente === null) {
            this.resultado = "Exito"
            this.terminarActividad()
            return
        }

        if (this.actividadSecundaria === null) {
            this._iniciarReposicion(
                pendiente.tipo,
                pendiente.cantidad
            )
        }
    }
}