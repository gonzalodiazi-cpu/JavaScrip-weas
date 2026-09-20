import {Colono} from "./Colono.js"

export class Casa{
    constructor(nombre, colonia, posicion) {
        this.nombre = nombre
        this.colonia = colonia
        this.costoCrearColono = 50
        this.capacidad = 2
        this.colonos = new Map()
        this.posicion = posicion
        this.ancho = 200
        this.alto = 200
        this.imagen = "Casa"
    }
    crearColono(nombre, posicion=this.posicion) {

        if (this.colonos.size >= this.capacidad) {
            return
        }

        if (this.colonia.comida<this.costoCrearColono) {
            return
        }

        this.colonia.gastarComida(this.costoCrearColono)

        const colono = new Colono(nombre, this.colonia, posicion)
        this.colonos.set(nombre, colono)
        this.colonia.agregarColono(colono)
    }
}