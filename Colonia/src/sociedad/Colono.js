export class Colono {
  constructor(nombre, colonia, posicion) {
    this.nombre = nombre
    this.colonia = colonia
    this.posicion = posicion
    this.trabajo = null
  }
  asignarTrabajo(trabajo) {
    this.trabajo = trabajo
  }
}