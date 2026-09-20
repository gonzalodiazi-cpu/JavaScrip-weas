import { describe, it, expect, vi } from "vitest"
import { Renderizador } from "@src/visualizacion/Renderizador.js"
import { Colono } from "@src/sociedad/Colono.js"
import { Colonia } from "@src/sociedad/Colonia.js"
import { Arbol } from "@src/mundo/Arbol.js"
import { Recurso } from "@src/mundo/Recurso.js"
import { Casa } from "../../src/sociedad/Casa.js"
import { Mundo } from "../../src/mundo/Mundo.js"

function crearColonia() {
    const mundo = new Mundo(1200, 800)
    return new Colonia(mundo)
}
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

        const colonia = crearColonia()
        const colono = new Colono(
            "Juan",
            colonia,
            { x: 10, y: 20 }
        )

        renderizador.dibujarObjeto(colono)

        expect(gestorImagenes.obtener).toHaveBeenCalledWith(
            colono.imagen
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

        renderizador.dibujarObjeto(arbol)

        expect(gestorImagenes.obtener).toHaveBeenCalledWith(
            arbol.imagen
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

        renderizador.dibujarObjeto(recurso)

        expect(gestorImagenes.obtener).toHaveBeenCalledWith(recurso.imagen)

        expect(contexto.drawImage).toHaveBeenCalledWith(
            imagen,
            recurso.posicion.x - recurso.ancho / 2,
            recurso.posicion.y - recurso.alto,
            recurso.ancho,
            recurso.alto
        )
    })
    it("Dibuja las casas de las colonias del mundo", () => {
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

        const colonia = crearColonia()

        colonia.crearCasa("Casa 1", {x:200,y:300})

        const mundo = {
            colonias: [colonia],
            arboles: [],
            recursos: []
        }

        renderizador.dibujarMundo(mundo)

        expect(gestorImagenes.obtener).toHaveBeenCalledWith("Casa")
    })

    it("Dibuja los ayuntamientos de las colonias del mundo", () => {
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

        const colonia = crearColonia()

        const mundo = {
            colonias: [colonia],
            arboles: [],
            recursos: []
        }

        renderizador.dibujarMundo(mundo)

        expect(gestorImagenes.obtener).toHaveBeenCalledWith(
            colonia.ayuntamiento.imagen
        )
    })

    it("Un renderizador usa los objetos dibujables de cada colonia", () => {
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

        const colonia = {
            paraCadaObjetoDibujable: vi.fn(),
            ayuntamiento: {
                posicion: { x: 500, y: 500 },
                ancho: 200,
                alto: 200,
                colonia: {
                    madera: 0
                }
            }
        }

        const mundo = {
            colonias: [colonia],
            arboles: [],
            recursos: []
        }

        renderizador.dibujarMundo(mundo)

        expect(colonia.paraCadaObjetoDibujable).toHaveBeenCalled()
    })

    it("Un renderizador dibuja los árboles, ayuntamientos, casas, recursos y colonos del mundo", () => {
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
        const imagenAyuntamiento = {}

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
                if (nombre === "Ayuntamiento") {
                    return imagenAyuntamiento
                }
            })
        }

        const renderizador = new Renderizador(canvas, gestorImagenes)

        const colonia = crearColonia()
        const ayuntamiento = colonia.ayuntamiento

        const arbol = new Arbol({
            x: 30,
            y: 40
        })

        const casa = new Casa("Casa 1", colonia, {x: 200, y:300})
        colonia.casas.set("Casa 1", casa)

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 10, y: 20 }
        )

        colonia.agregarColono(colono)
        const recurso = new Recurso(
            "madera",
            10,
            { x: 50, y: 60 }
        )

        const mundo = {
            arboles: [arbol],
            recursos: [recurso],
            colonias: [colonia]
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
        expect(contexto.drawImage).toHaveBeenCalledWith(
            imagenAyuntamiento,
            ayuntamiento.posicion.x - ayuntamiento.ancho / 2,
            ayuntamiento.posicion.y - ayuntamiento.alto,
            ayuntamiento.ancho,
            ayuntamiento.alto
        )
    })

    it("Un renderizador dibuja los colonos al final", () => {
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
            obtener: vi.fn(nombre => nombre)
        }

        const renderizador = new Renderizador(canvas, gestorImagenes)

        const colonia = crearColonia()

        colonia.crearCasa("Casa 1", { x: 200, y: 300 })

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 100, y: 100 }
        )

        colonia.agregarColono(colono)

        const arbol = new Arbol({ x: 30, y: 40 })
        const recurso = new Recurso(
            "Madera",
            10,
            { x: 50, y: 60 }
        )

        const mundo = {
            arboles: [arbol],
            recursos: [recurso],
            colonias: [colonia]
        }

        renderizador.dibujarMundo(mundo)

        const imagenesDibujadas = contexto.drawImage.mock.calls.map(
            llamada => llamada[0]
        )

        expect(imagenesDibujadas.at(-1)).toBe(colono.imagen)
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
            recursos: [],
            colonias: []
        }

        renderizador.dibujarMundo(mundo)

        expect(contexto.clearRect).toHaveBeenCalledWith(
            0,
            0,
            1200,
            800
        )
    })

    it("Un renderizador puede dibujar un objeto", () => {
        const canvas = {
            getContext: () => ({
                drawImage: vi.fn()
            })
        }

        const gestorImagenes = {
            obtener: vi.fn(() => "imagen")
        }

        const renderizador = new Renderizador(canvas, gestorImagenes)

        const objeto = {
            imagen: "Casa",
            posicion: { x: 100, y: 200 },
            ancho: 50,
            alto: 60
        }

        renderizador.dibujarObjeto(objeto)

        expect(gestorImagenes.obtener).toHaveBeenCalledWith("Casa")
    })

    it("Dibuja la casa en construcción", () => {
        const canvas = {
            width: 1000,
            height: 1000,
            getContext: () => ({
                drawImage: (...argumentos) => {
                    canvas.argumentosDibujo = argumentos
                }
            })
        }

        const gestorImagenes = {
            obtener: nombre => {
                if (nombre === "Casa_Construccion") {
                    return "imagenCasa"
                }
            }
        }

        const renderizador = new Renderizador(
            canvas,
            gestorImagenes
        )

        const interfaz = {
            posicionCasaEnConstruccion: {
                x: 300,
                y: 400
            }
        }

        renderizador.dibujarCasaEnConstruccion(interfaz)

        expect(canvas.argumentosDibujo[0]).toBe("imagenCasa")
    })
    it("Dibuja la casa en construcción al dibujar el mundo", () => {
        const contexto = {
            drawImage: vi.fn(),
            clearRect: vi.fn()
        }

        const canvas = {
            width: 1000,
            height: 1000,
            getContext: () => contexto
        }

        const gestorImagenes = {
            obtener: vi.fn()
        }

        const renderizador = new Renderizador(canvas, gestorImagenes)

        const mundo = {
            colonias: [],
            arboles: [],
            recursos: []
        }

        const interfaz = {
            posicionCasaEnConstruccion: {
                x: 300,
                y: 400
            }
        }

        renderizador.dibujarMundo(mundo, interfaz)

        expect(gestorImagenes.obtener).toHaveBeenCalledWith(
            "Casa_Construccion"
        )
    })
})
