import { Desempleado } from "./trabajos/Desempleado.js"
import { EstadisticasColono } from "./EstadisticasColono.js"
import { Inventario } from "../inventario/Inventario.js"


export class Colono {
  constructor(nombre, colonia, posicion) {
    this.nombre = nombre
    this.colonia = colonia
    this.posicion = posicion
    this.ancho = 100
    this.alto = 100
    this.trabajo = colonia.desempleado
    this.estadisticas = new EstadisticasColono(colonia.estadisticasBaseColono, this.trabajo)
    this.destino = null
    this.objetivo = null
    this.actividad= null
    this.inventario = new Inventario(this.estadisticas)

    return new Proxy(this, {
      get(colono, propiedad) {
        if (propiedad in colono) {
          return colono[propiedad]
        }

        if (propiedad in colono.estadisticas) {
          return colono.estadisticas[propiedad]
        }

        return undefined
      }
    })
  }
  get imagen() {
    if (this.actividad !== null) {
        return this.actividad.imagen
    }

    return this.trabajo.imagen
  }

  asignarTrabajo(trabajo) {
    this.trabajo=trabajo
    this.estadisticas.trabajo=trabajo
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
    this.objetivo=objeto
    this.establecerDestino(objeto.posicion)
  }

  buscarOptimo(objetos) {
    let optimo = null
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
    if (optimo !==null) {
      this.buscar(optimo)
    }
  }

  asignarObjetivo(objeto) {
    this.objetivo = objeto
    this.establecerDestino(objeto.posicion)
    objeto.asignarResponsable(this)
  }

  liberarObjetivo() {
    this.objetivo.liberarResponsable()
    this.objetivo = null
    this.destino = null
  }

  estaEnPosicion(posicion) {
      return (
          this.posicion.x === posicion.x &&
          this.posicion.y === posicion.y
      )
  }

  estaEnPosObj(objeto) {
    return this.estaEnPosicion(objeto.posicion)
  }

  talar(arbol) {
    if (this.estaEnPosObj(arbol)) {
      arbol.talar(this.dañoTala)
    }
  }

  recoger(recurso) {
    if (this.estaEnPosObj(recurso)) {
      this.inventario.recogerRecurso(recurso)
    }
  }

  encenderMaquina(maquina) {
    if (this.estaEnPosObj(maquina)) {
      maquina.encender()
    }
  }
  actualizar() {
    if (this.actividad !== null) {
      this.actividad.actualizar()
    }
    this.actualizarMovimiento()
  }
}