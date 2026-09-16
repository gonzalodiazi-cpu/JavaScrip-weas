import { describe, it, expect } from "vitest";
import { Recurso } from "@src/mundo/Recurso.js";

describe("Recurso", () => {
  it("Un recurso tiene un tipo, una cantidad y una posición al ser creado", () => {
    // preparar
    const posicion = { x: 10, y: 5 }

    // ejecutar
    const recurso = new Recurso("madera",10, posicion)

    // comprobar
    expect(recurso.tipo).toBe("madera")
    expect(recurso.cantidad).toBe(10)
    expect(recurso.posicion).toEqual(posicion)
  })

  it("Un recurso tiene una imagen según su tipo", () => {
    const recurso = new Recurso("madera", 10, { x: 100, y: 100 })

    expect(recurso.imagen).toBe("Madera")
  })
})