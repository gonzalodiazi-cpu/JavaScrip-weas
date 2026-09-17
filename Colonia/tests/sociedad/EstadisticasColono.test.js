import { describe, it, expect } from "vitest"
import { EstadisticasBaseColono } from "@src/sociedad/EstadisticasBaseColono.js"
import { EstadisticasColono } from "@src/sociedad/EstadisticasColono.js"
import { Desempleado } from "@src/sociedad/trabajos/Desempleado.js"
import { Leñador } from "../../src/sociedad/trabajos/Leñador"

describe("EstadisticasColono", () => {
    it("Obtiene las características del inventario desde la base", () => {
        const base = new EstadisticasBaseColono()
        const trabajo = new Desempleado()
        const estadisticas = new EstadisticasColono(base, trabajo)

        expect(estadisticas.cantidadSlotsInventario)
            .toBe(base.cantidadSlotsInventario)

        expect(estadisticas.capacidadSlotsInventario)
            .toBe(base.capacidadSlotsInventario)
    })

    it("Combina las estadísticas base con los modificadores del trabajo", () => {
        const base = new EstadisticasBaseColono()
        const trabajo = new Desempleado()

        base.velocidad = 10
        base.dañoTala = 20
        base.velocidadTala = 30

        trabajo.modificadorVelocidad = 2
        trabajo.modificadorDañoTala = 3
        trabajo.modificadorVelocidadTala = 4

        const estadisticas = new EstadisticasColono(base, trabajo)

        expect(estadisticas.velocidad).toBe(12)
        expect(estadisticas.dañoTala).toBe(23)
        expect(estadisticas.velocidadTala).toBe(34)
    })

    it("Refleja cambios posteriores en las estadísticas base", () => {
        const base = new EstadisticasBaseColono()
        const trabajo = new Desempleado()
        const estadisticas = new EstadisticasColono(base, trabajo)

        base.cantidadSlotsInventario = 7

        expect(estadisticas.cantidadSlotsInventario).toBe(7)
    })
    it("Las estadísticas cambian al cambiar de trabajo", () => {
        const base = new EstadisticasBaseColono()
        const desempleado = new Desempleado()
        const leñador = new Leñador()

        const estadisticas = new EstadisticasColono(base, desempleado)

        estadisticas.trabajo = leñador

        expect(estadisticas.velocidad).toBe(
            base.velocidad + leñador.modificadorVelocidad
        )
    })
})