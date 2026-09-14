import { describe, it, expect } from "vitest";
import { Arbol } from "@src/mundo/Arbol.js";

describe("Arbol", () => {
  it("Un árbol nuevo comienza en etapa 1 y tiene 2 unidades de madera", () => {
    // preparar
    const arbol = new Arbol()
    
    // ejecutar


    // comprobar
    expect(arbol.etapaCrecimiento).toBe(1)
    expect(arbol.madera).toBe(2)
  });

  it("Un árbol en etapa 1 crece a etapa 2 y pasa de tener 2 a 3 unidades de madera", () => {
  // preparar
    const arbol = new Arbol()

  // ejecutar
    arbol.crecer()

  // comprobar
    expect(arbol.madera).toBe(3)
    expect(arbol.etapaCrecimiento).toBe(2)
  });
    it("Un árbol en etapa 2 crece a etapa 3 y pasa de tener 3 a 10 unidades de madera", () => {
  // preparar
    const arbol = new Arbol()

  // ejecutar
    arbol.crecer()
    arbol.crecer()

  // comprobar
    expect(arbol.madera).toBe(10)
    expect(arbol.etapaCrecimiento).toBe(3)
  });
});