import { describe, it, expect, vi } from "vitest"
import { Renderizador } from "@src/visualizacion/Renderizador.js"
import { Colono } from "@src/sociedad/Colono.js"
import { Colonia } from "@src/sociedad/Colonia.js"
import { Arbol } from "@src/mundo/Arbol.js"

describe("Renderizador", () => {
    it("Un renderizador obtiene el contexto del canvas", () => {
        const contexto = {}

        const canvas = {
            getContext: () => contexto
        }

        const gestorImagenes = {
            obtener: vi.fn()
        }

        const renderizador = new Renderizador(canvas, gestorImagenes)

        expect(renderizador.contexto).toBe(contexto)
    })

    it("Un renderizador dibuja un colono", () => {
        const contexto = {
            drawImage: vi.fn()
        }

        const canvas = {
            getContext: () => contexto
        }

        const imagen = {}

        const gestorImagenes = {
            obtener: vi.fn(() => imagen)
        }

        const renderizador = new Renderizador(canvas, gestorImagenes)

        const colonia = new Colonia()
        const colono = new Colono(
            "Juan",
            colonia,
            { x: 10, y: 20 }
        )

        renderizador.dibujarColono(colono)

        expect(gestorImagenes.obtener).toHaveBeenCalledWith(
            colono.trabajo.imagen
        )

        expect(contexto.drawImage).toHaveBeenCalledWith(
            imagen,
            colono.posicion.x - colono.ancho / 2,
            colono.posicion.y - colono.alto,
            colono.ancho,
            colono.alto
        )
    })

    it("Un renderizador dibuja un árbol", () => {
        const contexto = {
            drawImage: vi.fn()
        }

        const canvas = {
            getContext: () => contexto
        }

        const imagen = {}

        const gestorImagenes = {
            obtener: vi.fn(() => imagen)
        }

        const renderizador = new Renderizador(canvas, gestorImagenes)

        const arbol = new Arbol({ x: 30, y: 40 })

        renderizador.dibujarArbol(arbol)

        expect(gestorImagenes.obtener).toHaveBeenCalledWith(
            `Arbol_etapa_${arbol.etapaCrecimiento}`
        )

        expect(contexto.drawImage).toHaveBeenCalledWith(
            imagen,
            arbol.posicion.x - arbol.ancho/2,
            arbol.posicion.y - arbol.alto,
            arbol.ancho,
            arbol.alto
        )
    })

    it("Un renderizador dibuja los árboles y colonos del mundo", () => {
        const contexto = {
            drawImage: vi.fn(),
            clearRect: vi.fn()
        }

        const canvas = {
            getContext: () => contexto
        }

        const imagenArbol = {}
        const imagenColono = {}

        const gestorImagenes = {
            obtener: vi.fn((nombre) => {
                if (nombre === "Colono") {
                    return imagenColono
                }

                if (nombre === "Arbol_etapa_1") {
                    return imagenArbol
                }
            })
        }

        const renderizador = new Renderizador(canvas, gestorImagenes)

        const colonia = new Colonia()

        const arbol = new Arbol({
            x: 30,
            y: 40
        })

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 10, y: 20 }
        )

        const mundo = {
            arboles: [arbol],
            colonos: [colono]
        }

        renderizador.dibujarMundo(mundo)

        expect(contexto.drawImage).toHaveBeenCalledWith(
            imagenArbol,
            arbol.posicion.x-arbol.ancho/2,
            arbol.posicion.y - arbol.alto,
            arbol.ancho,
            arbol.alto
        )

        expect(contexto.drawImage).toHaveBeenCalledWith(
            imagenColono,
            colono.posicion.x-colono.ancho/2,
            colono.posicion.y-colono.alto,
            colono.ancho,
            colono.alto
        )
    })

    it("Un renderizador limpia todo el canvas antes de dibujar el mundo", () => {
        const contexto = {
            drawImage: vi.fn(),
            clearRect: vi.fn()
        }

        const canvas = {
            width: 1200,
            height: 800,
            getContext: () => contexto
        }

        const gestorImagenes = {
            obtener: vi.fn()
        }

        const renderizador = new Renderizador(canvas, gestorImagenes)

        const mundo = {
            arboles: [],
            colonos: []
        }

        renderizador.dibujarMundo(mundo)

        expect(contexto.clearRect).toHaveBeenCalledWith(
            0,
            0,
            1200,
            800
        )
    })
})
