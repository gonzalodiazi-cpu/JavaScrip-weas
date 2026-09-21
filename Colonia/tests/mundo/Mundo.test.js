import { describe, it, expect, vi } from "vitest";
import { Mundo } from "@src/mundo/Mundo.js";
import { Arbol } from "@src/mundo/Arbol.js";
import { Recurso } from "../../src/mundo/Recurso.js";
import { Colono } from "../../src/sociedad/Colono.js";
import { Colonia } from "../../src/sociedad/Colonia.js";
import { MaquinaProcesadora } from "../../src/maquinas/MaquinaProcesadora.js";
import { Receta } from "../../src/maquinas/Receta.js";

class MaquinaDePrueba extends MaquinaProcesadora {
    constructor() {
        const receta = new Receta(
            new Map([["Madera", 10]]),
            new Map([["Tablas", 5]])
        )
        super(receta)
    }
}

describe("Mundo", () => {
  it("Un mundo tiene un ancho y un alto", () => {
    const mundo = new Mundo(1200, 800)

    expect(mundo.ancho).toBe(1200)
    expect(mundo.alto).toBe(800)
  })
  
  it("Un mundo comienza sin árboles ni recursos", () => {
    // ejecutar
    const mundo = new Mundo()

    // comprobar
    expect(mundo.arboles.length).toBe(0)
    expect(mundo.recursos.length).toBe(0)
  })

  it("Un mundo puede crear un árbol", () => {
    // preparar
    const mundo = new Mundo()
    const posicion = { x: 10, y: 5 }

    // ejecutar
    mundo.crearArbol(posicion)

    // comprobar
    expect(mundo.arboles.length).toBe(1)

    const arbol = mundo.arboles[0]

    expect(arbol).toBeInstanceOf(Arbol)
    expect(arbol.posicion).toEqual(posicion)
  })

  it("Un mundo puede agregar un recurso", () => {
    const mundo = new Mundo()
    const recurso = new Recurso("madera", 10, { x: 10, y: 5 })

    mundo.agregarRecurso(recurso)

    expect(mundo.recursos.length).toBe(1)
    expect(mundo.recursos[0]).toBe(recurso)
  })

  it("Un mundo elimina un árbol descartable y deja su madera como recurso", () => {
    const mundo = new Mundo()
    const posicion = { x: 10, y: 5 }

    mundo.crearArbol(posicion)
    const arbol = mundo.arboles[0]

    arbol.talar(arbol.durabilidad)

    mundo.procesarArbolesDescartables()

    expect(mundo.arboles.length).toBe(0)
    expect(mundo.recursos.length).toBe(1)

    const recurso = mundo.recursos[0]

    expect(recurso.tipo).toBe("Madera")
    expect(recurso.cantidad).toBe(arbol.madera)
    expect(recurso.posicion).toEqual(posicion)
  })
  it("El mundo actualiza el movimiento de los colonos de sus colonia", () => {
    const mundo = new Mundo()
    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.establecerDestino({ x: 10, y: 0 })
    
    colonia.agregarColono(colono)

    mundo.actualizar()

    expect(colono.posicion).toEqual({ x: 1, y: 0 })
  })

  it("Un mundo actualiza las actividades de sus colonos", () => {
    const mundo = new Mundo()
    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    let ejecutada = false
    colono.actividad = () => {
        ejecutada = true
    }

    colonia.agregarColono(colono)

    mundo.actualizar()

    expect(ejecutada).toBe(true)
  })

  it("Un mundo actualiza sus árboles convirtiendo el tiempo a segundos", () => {
    const arbol = {
        actualizar: vi.fn()
    }

    const mundo = new Mundo()
    mundo.arboles.push(arbol)

    mundo.actualizar(100)

    expect(arbol.actualizar).toHaveBeenCalledWith(0.1)
  })
  it("Un mundo procesa los árboles descartables al actualizarse", () => {
    const mundo = new Mundo()
    mundo.crearArbol({ x: 10, y: 5 })

    const arbol = mundo.arboles[0]
    arbol.talar(arbol.durabilidad)

    mundo.actualizar()

    expect(mundo.arboles.length).toBe(0)
    expect(mundo.recursos.length).toBe(1)
  })
  it("un colono tala un árbol mediante las actualizaciones del mundo", () => {
    const mundo = new Mundo()
    const arbol = new Arbol({ x: 1, y: 0 })
    mundo.arboles.push(arbol)

    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.actividad = colono.talarArboles
    colonia.agregarColono(colono)

    mundo.actualizar()

    expect(colono.objetivo).toBe(arbol)
    expect(colono.posicion).toEqual({ x: 1, y: 0 })

    mundo.actualizar()

    expect(arbol.durabilidad).toBe(
        10 - colono.dañoTala
    )
  })
  it("un colono busca otro árbol después de terminar de talar uno", () => {
    const mundo = new Mundo()

    const arbol1 = new Arbol({ x: 1, y: 0 })
    arbol1.durabilidad = 1

    const arbol2 = new Arbol({ x: 5, y: 0 })
    mundo.arboles.push(arbol1, arbol2)

    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.actividad = colono.talarArboles
    colonia.agregarColono(colono)

    mundo.actualizar()
    expect(colono.objetivo).toBe(arbol1)

    mundo.actualizar()

    mundo.actualizar()
    expect(colono.objetivo).toBe(arbol2)
  })
  it("un colono queda sin objetivo cuando no quedan árboles disponibles", () => {
    const mundo = new Mundo()

    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.actividad = colono.talarArboles
    colonia.agregarColono(colono)

    mundo.actualizar()

    expect(colono.objetivo).toBeNull()
  })
  it("varios colonos pueden talar árboles en paralelo", () => {
    const mundo = new Mundo()

    const arbol1 = new Arbol({ x: 1, y: 0 })
    const arbol2 = new Arbol({ x: 5, y: 0 })
    mundo.arboles.push(arbol1, arbol2)

    const colonia = new Colonia(mundo)

    const colono1 = new Colono("Juan", colonia, { x: 0, y: 0 })
    const colono2 = new Colono("Pedro", colonia, { x: 0, y: 0 })

    colono1.actividad = colono1.talarArboles
    colono2.actividad = colono2.talarArboles

    colonia.agregarColono(colono1)
    colonia.agregarColono(colono2)

    mundo.actualizar()

    expect(colono1.objetivo).toBe(arbol1)
    expect(colono2.objetivo).toBe(arbol2)
  })

  //Tests de actualizar
  it("Un mundo actualiza sus colonias en segundos", () => {
    const mundo = new Mundo()
    const colonia = {
        actualizar: vi.fn()
    }

    mundo.colonias.push(colonia)

    mundo.actualizar(100)

    expect(colonia.actualizar).toHaveBeenCalledWith(0.1)
  })

  it("Actualiza una máquina encendida de una colonia convirtiendo el tiempo a segundos", () => {
      const mundo = new Mundo(100, 100)
      const colonia = new Colonia(mundo)

      const maquina = new MaquinaDePrueba()
      colonia.maquinas.add(maquina)

      maquina.recibir("Madera", 10)
      maquina.encender()

      mundo.actualizar(2000)

      expect(maquina.tiempoProcesando).toBe(2)
  })
})