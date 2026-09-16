import { Desempleado } from "./trabajos/Desempleado.js"

export class Colono {
  constructor(nombre, colonia, posicion) {
    this.nombre = nombre
    this.colonia = colonia
    this.posicion = posicion
    this.ancho = 75
    this.alto = 75
    this.trabajo = new Desempleado()
    this.velocidad = this.trabajo.velocidadMovimiento
    this.destino = null
  }
  asignarTrabajo(trabajo) {
    this.trabajo = trabajo
    this.velocidad =trabajo.velocidadMovimiento
  }
  avanzarHacia(destino) {
    const dx = destino.x - this.posicion.x
    const dy = destino.y - this.posicion.y

    const distancia = Math.sqrt(dx ** 2 + dy ** 2)

    if (distancia <= this.velocidad) {
        this.posicion = { x: destino.x, y: destino.y }
        return
    }

    this.posicion = {
        x: this.posicion.x + (dx / distancia) * this.velocidad,
        y: this.posicion.y + (dy / distancia) * this.velocidad
    }
  }

  establecerDestino(objetivo) {
    this.destino = objetivo
  }
  actualizarMovimiento() {
    if (this.destino === null) {
        return
    }

    this.avanzarHacia(this.destino)

    if (this.posicion.x === this.destino.x &&
        this.posicion.y === this.destino.y) {
        this.destino = null
    }
  }
  buscar(objeto) {
    this.establecerDestino(objeto.posicion)
  }
  buscarOptimo(objetos) {
    let optimo = objetos[0]
    let distanciaOptima = Infinity

    for (const objeto of objetos) {
        const dx = objeto.posicion.x - this.posicion.x
        const dy = objeto.posicion.y - this.posicion.y
        const distancia = dx * dx + dy * dy

        if (distancia < distanciaOptima) {
            distanciaOptima = distancia
            optimo = objeto
        }
    }

    this.buscar(optimo)
  }
  talar(arbol) {
    if (arbol.posicion.x===this.posicion.x && arbol.posicion.y===this.posicion.y) {
      arbol.talar(this.trabajo.dañoTala)
    }
  }
}