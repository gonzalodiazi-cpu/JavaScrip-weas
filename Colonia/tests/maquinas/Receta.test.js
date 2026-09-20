import { describe, it, expect } from "vitest"
import { Receta } from "../../src/maquinas/Receta.js"

describe("Receta", () => {
    it("Conoce sus recursos necesarios y sus productos", () => {
        const receta = new Receta(
            new Map([["Madera", 10]]),
            new Map([["Tablas", 5]])
        )

        expect(receta.entradas.get("Madera")).toBe(10)
        expect(receta.salidas.get("Tablas")).toBe(5)
    })
})