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
    if (this.actividad===this.talarArboles) {
      return this.trabajo.imagen + "_con_Hacha"
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

  talar(arbol) {
    if (arbol.posicion.x===this.posicion.x && arbol.posicion.y===this.posicion.y) {
      arbol.talar(this.dañoTala)
    }
  }

  recoger(recurso) {
    if (recurso.posicion.x===this.posicion.x && recurso.posicion.y===this.posicion.y) {
      this.inventario.agregar(recurso)
    }
  }
  talarArboles() {
    if (this.objetivo === null) {
        const arbolesDisponibles = this.colonia.mundo.arboles.filter(
            arbol => arbol.responsable === null && !arbol.descartable
        )

        this.buscarOptimo(arbolesDisponibles)

        if (this.objetivo !== null) {
            this.objetivo.responsable = this
        }

        return
    }

    this.talar(this.objetivo)

    if (this.objetivo.descartable) {
        this.objetivo.responsable = null
        this.objetivo = null
        this.destino = null
    }
  }
  recogerRecursos(tipoRecurso = null) {
    if (this.posicion.x === this.colonia.ayuntamiento.posicion.x &&
      this.posicion.y === this.colonia.ayuntamiento.posicion.y) {

      this.colonia.ayuntamiento.recibirInventario(this.inventario)

      const maderaDisponible = this.colonia.mundo.recursos.some(
          recurso => recurso.tipo === tipoRecurso && !recurso.descartable
      )

      const tieneMadera = this.inventario.recursos.has(tipoRecurso)

      if (!maderaDisponible && !tieneMadera) {
          this.actividad = null
      }
    }
    if (this.objetivo === null) {
        const recursosDisponibles = this.colonia.mundo.recursos.filter(
            recurso =>
                (tipoRecurso === null || recurso.tipo === tipoRecurso) &&
                recurso.responsable === null &&
                !recurso.descartable
        )

        if (recursosDisponibles.length === 0) {
          if (this.inventario.recursos.has(tipoRecurso)) {
              this.destino = this.colonia.ayuntamiento.posicion
              return
          }

          this.actividad = null
          return
        }

        this.buscarOptimo(recursosDisponibles)

        if (this.objetivo !== null) {
            const cantidadAgregable =
                this.inventario.consultarCantidadAgregable(
                    this.objetivo,
                    this.objetivo.cantidad
                )

            if (cantidadAgregable === 0) {
                this.objetivo = null
                this.destino = this.colonia.ayuntamiento.posicion
                return
            }

            this.objetivo.responsable = this
        }

        return
    }

    this.recoger(this.objetivo)

    if (this.objetivo.descartable) {
        this.objetivo.responsable = null
        this.objetivo = null
        this.destino = null
        return
    }

    const cantidadAgregable =
      this.inventario.consultarCantidadAgregable(
          this.objetivo,
          this.objetivo.cantidad
      )

    if (cantidadAgregable === 0) {
      this.objetivo.responsable = null
      this.objetivo = null
      this.destino = this.colonia.ayuntamiento.posicion
    }
}
  
  actualizar() {
    if (this.actividad !== null) {
      this.actividad()
    }
    this.actualizarMovimiento()
  }
}