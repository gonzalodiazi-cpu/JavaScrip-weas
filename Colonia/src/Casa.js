import {Colono} from "./Colono.js"

export class Casa{
    constructor(nombre, colonia) {
        this.nombre = nombre
        this.colonia = colonia
        this.costoCrearColono = 50
        this.capacidad = 2
        this.colonos = new Map()
    }
    crearColono(nombre) {

        if (this.colonos.size >= this.capacidad) {
            return
        }

        this.colonia.gastarComida(this.costoCrearColono)

        const colono = new Colono(nombre, this.colonia)
        this.colonos.set(nombre, colono)
    }
}