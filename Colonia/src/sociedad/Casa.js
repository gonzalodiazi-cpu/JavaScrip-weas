import {Colono} from "./Colono.js"

export class Casa{
    constructor(nombre, colonia, posicion) {
        this.nombre = nombre
        this.colonia = colonia
        this.costoCrearColono = 50
        this.capacidad = 2
        this.colonos = new Map()
        this.posicion = posicion
        this.ancho = 100
        this.alto = 100
    }
    crearColono(nombre) {

        if (this.colonos.size >= this.capacidad) {
            return
        }

        if (this.colonia.comida<this.costoCrearColono) {
            return
        }

        this.colonia.gastarComida(this.costoCrearColono)

        const colono = new Colono(nombre, this.colonia)
        this.colonos.set(nombre, colono)
    }
}