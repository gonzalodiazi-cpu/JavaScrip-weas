import { describe, it, expect } from "vitest";
import { Recurso } from "@src/mundo/Recurso.js";

describe("Recurso", () => {
  it("Un recurso tiene un tipo, una cantidad, un estado agotado false y una posición al ser creado", () => {
    // preparar
    const posicion = { x: 10, y: 5 }

    // ejecutar
    const recurso = new Recurso("Madera",10, posicion)

    // comprobar
    expect(recurso.tipo).toBe("Madera")
    expect(recurso.cantidad).toBe(10)
    expect(recurso.posicion).toEqual(posicion)
    expect(recurso.agotado).toBe(false)
  })

  it("Un recurso tiene una imagen según su tipo", () => {
    const recurso = new Recurso("Madera", 10, { x: 100, y: 100 })

    expect(recurso.imagen).toBe("Madera")
  })

  it("Un recurso tiene su tipo con mayúscula inicial", () => {
    const recurso = new Recurso("Madera", 7, {x: 0, y: 0})

    expect(recurso.tipo).toBe("Madera")
  })

  it("Un recurso con cantidad 0 o negativa queda agotado", () => {
    const recurso = new Recurso("Madera", 5, {x:0,y:0})
    const recurso2= new Recurso("Madera", 3, {x:0,y:1})

    recurso.cantidad=0
    recurso2.cantidad=-3

    expect(recurso.agotado).toBe(true)
    expect(recurso2.agotado).toBe(true)
  })
})