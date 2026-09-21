import { describe, it, expect } from "vitest"
import { Sierra } from "@src/maquinas/Sierra.js"
import { MaquinaProcesadora } from "@src/maquinas/MaquinaProcesadora.js"

describe("Sierra", () => {
    it("Es una máquina procesadora con su receta y tiempo", () => {
        const sierra = new Sierra()

        expect(sierra).toBeInstanceOf(MaquinaProcesadora)

        expect(sierra.receta.entradas.get("Madera")).toBe(10)
        expect(sierra.receta.salidas.get("Tablas")).toBe(5)
        expect(sierra.tiempoParaProcesar).toBe(5)
    })
    it("Una sierra tiene una imagen según su estado", () => {
        const sierra = new Sierra({ x: 100, y: 100 })

        expect(sierra.imagen).toBe("Sierra_Apagada")

        sierra.recibir("Madera", 10)
        sierra.encender()

        expect(sierra.imagen).toBe("Sierra_Encendida")
    })
})