import { describe, it, expect, vi } from "vitest"
import { Renderizador } from "@src/visualizacion/Renderizador.js"

describe("Renderizador", () => {
    it("Un renderizador obtiene el contexto del canvas", () => {
        const contexto = {}

        const canvas = {
            getContext: () => contexto
        }

        const renderizador = new Renderizador(canvas)

        expect(renderizador.contexto).toBe(contexto)
    })

    it("Un renderizador dibuja un colono", () => {
        const contexto = {
            fillRect: vi.fn()
        }

        const canvas = {
            getContext: () => contexto
        }

        const renderizador = new Renderizador(canvas)

        const colono = {
            posicion: { x: 10, y: 20 }
        }

        renderizador.dibujarColono(colono)

        expect(contexto.fillRect).toHaveBeenCalledWith(10, 20, 10, 10)
    })
    it("Un renderizador dibuja un árbol", () => {
        const contexto = {
            fillRect: vi.fn()
        }

        const canvas = {
            getContext: () => contexto
        }

        const renderizador = new Renderizador(canvas)

        const arbol = {
            posicion: { x: 30, y: 40 }
        }

        renderizador.dibujarArbol(arbol)

        expect(contexto.fillRect).toHaveBeenCalledWith(30, 40, 20, 30)
    })

    it("Un renderizador dibuja los árboles y colonos del mundo", () => {
        const contexto = {
            fillRect: vi.fn(),
            clearRect: vi.fn()
        }

        const canvas = {
            getContext: () => contexto
        }

        const renderizador = new Renderizador(canvas)

        const arbol = {
            posicion: { x: 30, y: 40 }
        }

        const colono = {
            posicion: { x: 10, y: 20 }
        }

        const mundo = {
            arboles: [arbol],
            colonos: [colono]
        }

        renderizador.dibujarMundo(mundo)

        expect(contexto.fillRect).toHaveBeenCalledWith(30, 40, 20, 30)
        expect(contexto.fillRect).toHaveBeenCalledWith(10, 20, 10, 10)
    })

    it("Un renderizador limpia el canvas antes de dibujar el mundo", () => {
        const contexto = {
            fillRect: vi.fn(),
            clearRect: vi.fn()
        }

        const canvas = {
            getContext: () => contexto
        }

        const renderizador = new Renderizador(canvas)

        const mundo = {
            arboles: [],
            colonos: []
        }

        renderizador.dibujarMundo(mundo)

        expect(contexto.clearRect).toHaveBeenCalled()
    })
})