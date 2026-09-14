import { describe, it, expect } from "vitest";
import { Mundo } from "@src/mundo/Mundo.js";
import { Arbol } from "@src/mundo/Arbol.js";
import { Recurso } from "../../src/mundo/Recurso";


describe("Mundo", () => {
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

  it("Un mundo elimina un árbol talado y deja su madera como recurso", () => {
    const mundo = new Mundo()
    const posicion = { x: 10, y: 5 }

    mundo.crearArbol(posicion)
    const arbol = mundo.arboles[0]

    arbol.talar(arbol.durabilidad)

    mundo.actualizar()

    expect(mundo.arboles.length).toBe(0)
    expect(mundo.recursos.length).toBe(1)

    const recurso = mundo.recursos[0]

    expect(recurso.tipo).toBe("madera")
    expect(recurso.cantidad).toBe(arbol.madera)
    expect(recurso.posicion).toEqual(posicion)
  })
})