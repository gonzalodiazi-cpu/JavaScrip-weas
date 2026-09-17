import { describe, it, expect } from "vitest"
import { Inventario } from "@src/inventario/Inventario.js"
import { Recurso } from "../../src/mundo/Recurso"

describe("Inventario", () => {
    it("Un inventario comienza vacío y sus recursos se representan como un map", () => {
        const estadisticas = {}
        const inventario = new Inventario(estadisticas)

        expect(inventario.recursos).toBeInstanceOf(Map)
        expect(inventario.recursos.size).toBe(0)
    })
    it("Un inventario puede agregar un recurso que cabe completamente", () => {
        const estadisticas = {capacidadSlotsInventario: 10, cantidadSlotsInventario: 5}
        const inventario = new Inventario(estadisticas)

        const recurso = new Recurso("madera", 7, {x:0,y:0})

        inventario.agregar(recurso)

        expect(inventario.recursos.get("madera")).toBe(7)
    })
    it("Un inventario acumula recursos del mismo tipo", () => {
        const estadisticas = {capacidadSlotsInventario: 10, cantidadSlotsInventario: 5}
        const inventario = new Inventario(estadisticas)

        const recurso = new Recurso("madera", 7, {x:0,y:0})
        const recurso2 = new Recurso("madera", 8, {x:0, y:10})

        inventario.agregar(recurso)
        inventario.agregar(recurso2)

        expect(inventario.recursos.get("madera")).toBe(15)
    })
})