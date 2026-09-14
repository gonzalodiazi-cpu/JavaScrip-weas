import { describe, it, expect, vi } from "vitest"
import { iniciarJuego } from "@src/Main.js"

describe("Main", () => {
    it("inicia el juego y renderiza el mundo inicial", () => {
        const contexto = {
            clearRect: vi.fn(),
            fillRect: vi.fn()
        }

        const canvas = {
            width: 1200,
            height: 800,
            getContext: vi.fn(() => contexto)
        }

        let siguienteFrame

        const requestAnimationFrame = (callback) => {
            siguienteFrame = callback
        }

        vi.stubGlobal("requestAnimationFrame", requestAnimationFrame)

        iniciarJuego(canvas)

        siguienteFrame()

        expect(contexto.clearRect).toHaveBeenCalledWith(
            0,
            0,
            1200,
            800
        )

        expect(contexto.fillRect).toHaveBeenCalledWith(
            300,
            200,
            20,
            30
        )
    })

    it("el colono avanza hacia el árbol", () => {
        const contexto = {
            clearRect: vi.fn(),
            fillRect: vi.fn()
        }

        const canvas = {
            width: 1200,
            height: 800,
            getContext: vi.fn(() => contexto)
        }

        let siguienteFrame

        const requestAnimationFrame = (callback) => {
            siguienteFrame = callback
        }

        vi.stubGlobal("requestAnimationFrame", requestAnimationFrame)

        iniciarJuego(canvas)

        siguienteFrame()

        expect(contexto.fillRect).toHaveBeenCalledWith(
            101,
            200,
            10,
            10
        )
    })
})