import { Almacenamiento } from "./Almacenamiento.js"

export class MaquinaProcesadora {
    constructor(receta, colonia = null) {
        this.estado = "Apagada"
        this.colonia = colonia
        this.receta = receta
        this.factorAlmacenamientoEntrada = 5
        this.factorAlmacenamientoSalida = 5
        this.almacenamientoEntrada = null
        this.almacenamientoSalida = null
        this.tiempoProcesando = 0
        this.tiempoParaProcesar = 5
        
        this._crearAlmacenamientos()
    }

    // Métodos de construcción
    _crearAlmacenamientos() {
        this.almacenamientoEntrada =
        new Almacenamiento(
            this.receta.entradas,
            this.factorAlmacenamientoEntrada
        )
        this.almacenamientoSalida=
        new Almacenamiento(
            this.receta.salidas,
            this.factorAlmacenamientoSalida
        )
    }

    // Métodos de clase
    recibir(tipo, cantidad) {
        this.almacenamientoEntrada.guardar(tipo,cantidad)
    }

    tieneRecursosNecesarios() {
        for (const [tipo, cantidad] of this.receta.entradas) {
            if (!this.almacenamientoEntrada.tiene(tipo, cantidad)) {
                return false
            }
        }
        return true
    }

    tieneEspacioParaProcesar() {
        for (const [tipo, cantidad] of this.receta.salidas) {
            if (this.almacenamientoSalida.consultarCantidadGuardable(tipo, cantidad) < cantidad) {
                return false
            }
        }
        return true
    }

    encender() {
        if (this.tieneEspacioParaProcesar() && this.tieneRecursosNecesarios()) {
            this.estado="Encendida"
            for (const [tipo,cantidad] of this.receta.entradas) {
                this.almacenamientoEntrada.sacar(tipo, cantidad)
            }
        }
    }

    actualizar(t) {
        if (this.estado=="Encendida") {
            this.tiempoProcesando+=t
            if (this.tiempoProcesando>=this.tiempoParaProcesar) {
                this.tiempoProcesando=0
                for (const [tipo,cantidad] of this.receta.salidas) {
                    this.almacenamientoSalida.guardar(tipo, cantidad)
                }
                this.estado="Apagada"

            }
        }
    }

}
