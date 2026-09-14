import { describe, it, expect } from "vitest"
import { Juego } from "@src/Juego.js"
import { Mundo } from "@src/mundo/Mundo.js"
import { Colono } from "@src/sociedad/Colono.js"
import { Colonia } from "@src/sociedad/Colonia.js"

describe("Juego", () => {
    it("Un juego actualiza su mundo", () => {
        const mundo = new Mundo()
        const juego = new Juego(mundo)

        const colono = new Colono(
            "Juan",
            new Colonia(),
            { x: 0, y: 0 }
        )

        colono.establecerDestino({ x: 10, y: 0 })
        mundo.agregarColono(colono)

        juego.actualizar()

        expect(colono.posicion).toEqual({ x: 1, y: 0 })
    })

    it("Un juego inicia la actualización de su mundo", () => {
        const mundo = new Mundo()
        const colonia = new Colonia()

        const colono = new Colono("Juan", colonia, { x: 0, y: 0 })
        colono.establecerDestino({ x: 10, y: 0 })

        mundo.agregarColono(colono)

        const requestAnimationFrame = (callback) => {
            callback()
        }

        const juego = new Juego(mundo, requestAnimationFrame)

        juego.iniciar()

        expect(colono.posicion).toEqual({ x: 1, y: 0 })
    })
})