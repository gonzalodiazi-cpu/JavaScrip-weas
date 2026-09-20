import { Casa } from "./Casa.js"
import { Ayuntamiento } from "./Ayuntamiento.js";
import { EstadisticasBaseColono } from "./EstadisticasBaseColono.js"
import { EstadisticasColono } from "./EstadisticasColono.js"
import { Leñador } from "./trabajos/Leñador.js"
import { Desempleado } from "./trabajos/Desempleado.js";
import { Mundo } from "../mundo/Mundo.js";
export class Colonia {
    constructor(mundo) {
        this.mundo = mundo
        this.dinero =500
        this.comida = 200
        this.madera = 0
        this.costoCrearCasa = 100
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

    gastarComida(cantidad) {
        this.comida -= cantidad
    }

    gastarDinero(cantidad) {
        this.dinero -= cantidad
    }
}

