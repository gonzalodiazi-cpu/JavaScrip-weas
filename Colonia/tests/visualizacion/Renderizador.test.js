import { describe, it, expect, vi } from "vitest"
import { Renderizador } from "@src/visualizacion/Renderizador.js"
import { Colono } from "@src/sociedad/Colono.js"
import { Colonia } from "@src/sociedad/Colonia.js"
import { Arbol } from "@src/mundo/Arbol.js"
import { Recurso } from "@src/mundo/Recurso.js"
import { Casa } from "../../src/sociedad/Casa"

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
    it("Un renderizador dibuja un recurso", () => {
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

        const recurso = new Recurso(
            "madera",
            10,
            { x: 30, y: 40 }
        )

        renderizador.dibujarRecurso(recurso)

        expect(gestorImagenes.obtener).toHaveBeenCalledWith("Madera")

        expect(contexto.drawImage).toHaveBeenCalledWith(
            imagen,
            recurso.posicion.x - recurso.ancho / 2,
            recurso.posicion.y - recurso.alto,
            recurso.ancho,
            recurso.alto
        )
    })

    it("Un renderizador dibuja los árboles, casas, recursos y colonos del mundo", () => {
        const contexto = {
            drawImage: vi.fn(),
            clearRect: vi.fn()
        }

        const canvas = {
            getContext: () => contexto
        }

        const imagenArbol = {}
        const imagenColono = {}
        const imagenRecurso = {}
        const imagenCasa = {}

        const gestorImagenes = {
            obtener: vi.fn((nombre) => {
                if (nombre === "Colono") {
                    return imagenColono
                }

                if (nombre === "Arbol_etapa_1") {
                    return imagenArbol
                }
                if (nombre === "Madera") {
                    return imagenRecurso
                }
                if (nombre === "Casa") {
                    return imagenCasa
                }
            })
        }

        const renderizador = new Renderizador(canvas, gestorImagenes)

        const colonia = new Colonia()

        const arbol = new Arbol({
            x: 30,
            y: 40
        })

        const casa = new Casa("Casa 1", colonia, {x: 200, y:300})

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 10, y: 20 }
        )

        const recurso = new Recurso(
            "madera",
            10,
            { x: 50, y: 60 }
        )

        const mundo = {
            arboles: [arbol],
            colonos: [colono],
            recursos: [recurso],
            casas: [casa]
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
        expect(contexto.drawImage).toHaveBeenCalledWith(
            imagenRecurso,
            recurso.posicion.x - recurso.ancho / 2,
            recurso.posicion.y - recurso.alto,
            recurso.ancho,
            recurso.alto
        )
        expect(contexto.drawImage).toHaveBeenCalledWith(
            imagenCasa,
            casa.posicion.x - casa.ancho / 2,
            casa.posicion.y - casa.alto,
            casa.ancho,
            casa.alto
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
            colonos: [],
            recursos: [],
            casas: []
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
