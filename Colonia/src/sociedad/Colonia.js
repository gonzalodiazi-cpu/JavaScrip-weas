import { Casa } from "./Casa.js"
import { Ayuntamiento } from "./Ayuntamiento.js";
import { EstadisticasBaseColono } from "./EstadisticasBaseColono.js"
import { Leñador } from "./trabajos/Leñador.js"
import { Desempleado } from "./trabajos/Desempleado.js";
export class Colonia {
    constructor(mundo) {
        this.mundo = mundo
        mundo.agregarColonia(this)
        this.dinero =500
        this.comida = 200
        this.madera = 0
        this.costoCrearCasa = 100
        this.colonos = new Set()
        this.casas= new Map()
        this.maquinas = new Set()
        this.ayuntamiento= new Ayuntamiento(this.mundo, this)
        this.estadisticasBaseColono= new EstadisticasBaseColono()
        this.leñador = new Leñador()
        this.desempleado = new Desempleado()
        
    }

    crearCasa(nombre, posicion) {
        if (this.casas.size >= this.ayuntamiento.capacidadCasas) {
            return
        }

        if (this.dinero < this.costoCrearCasa) {
            return
        }

        this.gastarDinero(this.costoCrearCasa)

        const casa = new Casa(nombre,this,posicion)
        
        this.casas.set(nombre, casa)
    }

    agregarColono(colono) {
        this.colonos.add(colono)
    }

    gastarComida(cantidad) {
        this.comida -= cantidad
    }

    gastarDinero(cantidad) {
        this.dinero -= cantidad
    }

    actualizar(t) {
        for (const colono of this.colonos) {
            colono.actualizar()
        }
        for (const maquina of this.maquinas) {
            maquina.actualizar(t)
        }
    }

    paraCadaObjetoDibujable(accion) {
        for (const casa of this.casas.values()) {
            accion(casa)
        }

        accion(this.ayuntamiento)

        for (const colono of this.colonos) {
            accion(colono)
        }
    }
}

