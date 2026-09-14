import { Desempleado } from "./trabajos/Desempleado.js"

export class Colono {
  constructor(nombre, colonia, posicion) {
    this.nombre = nombre
    this.colonia = colonia
    this.posicion = posicion
    this.trabajo = new Desempleado()
  }
  asignarTrabajo(trabajo) {
    this.trabajo = trabajo
  }
}