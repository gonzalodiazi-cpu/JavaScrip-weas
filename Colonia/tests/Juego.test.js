import { describe, it, expect, vi } from "vitest"
import { Juego } from "@src/Juego.js"
import { Mundo } from "@src/mundo/Mundo.js"
import { Colono } from "@src/sociedad/Colono.js"
import { Colonia } from "@src/sociedad/Colonia.js"


describe("Juego", () => {
    it("Un juego actualiza su mundo con el tiempo transcurrido", () => {
        const mundo = {
            actualizar: vi.fn()
        }

        const juego = new Juego(mundo)

        juego.actualizar(100)

        expect(mundo.actualizar).toHaveBeenCalledWith(100)
    })

    it("Un juego inicia la actualización de su mundo", () => {
        const mundo = new Mundo()
        const colonia = new Colonia(mundo)

        const colono = new Colono("Juan", colonia, { x: 0, y: 0 })
        colono.establecerDestino({ x: 10, y: 0 })

        colonia.agregarColono(colono)

        let primeraLlamada = true

        const requestAnimationFrame = (callback) => {
            if (primeraLlamada) {
                primeraLlamada = false
                callback(0)
            }
        }

        const juego = new Juego(mundo, requestAnimationFrame)

        juego.iniciar()

        expect(colono.posicion).toEqual({ x: 1, y: 0 })
    })
    it("Un juego programa el siguiente frame después de actualizar", () => {
        const mundo = new Mundo()

        let siguienteFrame
        let cantidadDeFrames = 0

        const requestAnimationFrame = (callback) => {
            siguienteFrame = callback
            cantidadDeFrames += 1
        }

        const juego = new Juego(mundo, requestAnimationFrame)

        juego.iniciar()

        expect(cantidadDeFrames).toBe(1)

        siguienteFrame()

        expect(cantidadDeFrames).toBe(2)
    })

    it("Un juego renderiza su mundo después de actualizarlo", () => {
        const mundo = new Mundo()

        const renderizador = {
            dibujarMundo: vi.fn()
        }

        const juego = new Juego(mundo, null, renderizador)

        juego.actualizar()

        expect(renderizador.dibujarMundo).toHaveBeenCalledWith(mundo,null)
    })
    it("Un juego calcula el tiempo transcurrido entre frames", () => {
        let callback
        const requestAnimationFrame = vi.fn(cb => {
            callback = cb
        })

        const mundo = {
            actualizar: vi.fn()
        }

        const juego = new Juego(mundo, requestAnimationFrame)

        juego.iniciar()

        callback(100)
        callback(150)

        expect(mundo.actualizar).toHaveBeenLastCalledWith(50)
    })
        it("Pasa la interfaz al renderizador al actualizar", () => {
        const mundo = {
            actualizar: vi.fn()
        }

        const renderizador = {
            dibujarMundo: vi.fn()
        }

        const requestAnimationFrame = vi.fn()

        const juego = new Juego(
            mundo,
            requestAnimationFrame,
            renderizador
        )

        const interfaz = {}

        juego.interfaz = interfaz
        juego.actualizar(16)

        expect(renderizador.dibujarMundo).toHaveBeenCalledWith(
            mundo,
            interfaz
        )
    })
})