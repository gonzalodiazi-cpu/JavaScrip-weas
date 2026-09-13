import { Casa } from "./Casa.js"

export class Colonia {
    constructor() {
        this.dinero =500
        this.comida = 100
        this.costoCrearCasa = 100
        this.casas= new Map()
    }
    crearCasa(nombre) {
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

