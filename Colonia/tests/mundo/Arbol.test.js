import { describe, it, expect } from "vitest";
import { Arbol } from "@src/mundo/Arbol.js";

describe("Arbol", () => {
  it("Un árbol nuevo comienza en etapa 1 y tiene 2 unidades de madera y 10 de durabilidad", () => {
    // preparar
    const arbol = new Arbol({x:5,y:10})
    
    // ejecutar


    // comprobar
    expect(arbol.etapaCrecimiento).toBe(1)
    expect(arbol.madera).toBe(2)
    expect(arbol.durabilidad).toBe(10)
  });

  it("Un árbol en etapa 1 crece a etapa 2 y pasa de tener 2 a 3 unidades de madera y 20 de durabilidad", () => {
  // preparar
    const arbol = new Arbol({x:5,y:10})

  // ejecutar
    arbol.crecer()

  // comprobar
    expect(arbol.madera).toBe(3)
    expect(arbol.etapaCrecimiento).toBe(2)
    expect(arbol.durabilidad).toBe(20)
  });
  it("Un árbol en etapa 2 crece a etapa 3 y pasa de tener 3 a 10 unidades de madera y 50 durabilidad", () => {
  // preparar
    const arbol = new Arbol({x:5,y:10})

  // ejecutar
    arbol.crecer()
    arbol.crecer()

  // comprobar
    expect(arbol.madera).toBe(10)
    expect(arbol.etapaCrecimiento).toBe(3)
    expect(arbol.durabilidad).toBe(50)
  });
  it("Un Árbol no puede crecer más alla de la etapa 3", () => {
  // preparar
    const arbol = new Arbol({x:5,y:10})

  // ejecutar
    arbol.crecer()
    arbol.crecer()
    arbol.crecer()

  // comprobar
    expect(arbol.etapaCrecimiento).toBe(3)
    expect(arbol.madera).toBe(10)
    expect(arbol.durabilidad).toBe(50)
  });
  it("Talar un árbol reduce su durabilidad", () => {
  // preparar
    const arbol = new Arbol({x:5,y:10})

  // ejecutar
    arbol.talar(5)

  // comprobar
    expect(arbol.durabilidad).toBe(5)
  })
  it("Un árbol no puede tener durabilidad menor que 0", () => {
  // preparar
    const arbol = new Arbol({x:5,y:10})

  // ejecutar
    arbol.talar(arbol.durabilidad + 1)

  // comprobar
    expect(arbol.durabilidad).toBe(0)
  })
  it("Un árbol está talado cuando su durabilidad llega a 0", () => {
  // preparar
    const arbol = new Arbol({x:5,y:10})

  // ejecutar
    arbol.talar(arbol.durabilidad)

  // comprobar
    expect(arbol.talado).toBe(true)
  })
  it("Un árbol tiene una posición al ser creado", () => {
  // preparar
    const posicion = { x: 10, y: 5 }

  // ejecutar
    const arbol = new Arbol(posicion)

  // comprobar
    expect(arbol.posicion).toEqual(posicion)
  })
});