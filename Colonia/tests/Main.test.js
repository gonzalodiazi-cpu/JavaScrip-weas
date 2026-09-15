import { describe, it, expect, vi } from "vitest"
import { iniciarJuego } from "@src/Main.js"

describe("Main", () => {
    it("inicia el juego y renderiza el mundo inicial", () => {
        const contexto = {
            clearRect: vi.fn(),
            drawImage: vi.fn()
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

        vi.stubGlobal("Image", class {
            constructor() {
                this.src = ""
            }
        })

        iniciarJuego(canvas, requestAnimationFrame)

        siguienteFrame()

        expect(contexto.clearRect).toHaveBeenCalledWith(
            0,
            0,
            1200,
            800
        )

        expect(contexto.drawImage).toHaveBeenCalled()
    })

    it("el colono avanza hacia el árbol", () => {
        const contexto = {
            clearRect: vi.fn(),
            drawImage: vi.fn()
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

        vi.stubGlobal("Image", class {
            constructor() {
                this.src = ""
            }
        })

        iniciarJuego(canvas, requestAnimationFrame)

        siguienteFrame()

        expect(contexto.drawImage).toHaveBeenCalled()
    })
})