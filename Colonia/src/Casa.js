import {Colono} from "./Colono.js"

export class Casa{
    constructor(nombre, colonia) {
        this.nombre = nombre
        this.colonia = colonia
        this.capacidad = 2
        this.colonos = new Map()
    }
    crearColono(nombre) {
        this.colonia.gastarComida(50)

        const colono = new Colono(nombre, this.colonia)
        this.colonos.set(nombre, colono)
    }
}