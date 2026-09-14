import { Casa } from "./Casa.js"
import { Ayuntamiento } from "./Ayuntamiento.js";
export class Colonia {
    constructor() {
        this.dinero =500
        this.comida = 200
        this.costoCrearCasa = 100
        this.casas= new Map()
        this.ayuntamiento= new Ayuntamiento()
    }
    crearCasa(nombre) {
        if (this.casas.size >= this.ayuntamiento.capacidadCasas) {
            return
        }

        if (this.dinero < this.costoCrearCasa) {
            return
        }

        this.gastarDinero(this.costoCrearCasa)

        const casa = new Casa(nombre,this)
        
        this.casas.set(nombre, casa)
    }

    gastarComida(cantidad) {
        this.comida -= cantidad
    }

    gastarDinero(cantidad) {
        this.dinero -= cantidad
    }
}

