import { Mundo } from "./mundo/Mundo.js"
import { Juego } from "./Juego.js"
import { Renderizador } from "./visualizacion/Renderizador.js"
import { Colono } from "./sociedad/Colono.js"
import { Colonia } from "./sociedad/Colonia.js"
import { GestorImagenes } from "./visualizacion/GestorImagenes.js"
import { Casa } from "./sociedad/Casa.js"

export function iniciarJuego(canvas, requestAnimationFrame) {
    const mundo = new Mundo()

    mundo.crearArbol({ x: 900, y: 500 })
    mundo.crearArbol({ x: 900, y: 300 })
    mundo.crearArbol({ x: 600, y: 300 })
    mundo.crearArbol({ x: 600, y: 500 })
    mundo.crearArbol({ x: 300, y: 300 })
    mundo.crearArbol({ x: 300, y: 500 })
    mundo.crearArbol({ x: 100, y: 300 })
    mundo.crearArbol({ x: 100, y: 500 })
    mundo.crearArbol({ x: 300, y: 800 })
    mundo.crearArbol({ x: 600, y: 800 })
    mundo.crearArbol({ x: 900, y: 800 })
    mundo.crearArbol({ x: 100, y: 800 })

    const colonia = new Colonia(mundo)

    const colono = new Colono(
        "Juan",
        colonia,
        { x: 100, y: 200 }
    )

    const colono2 = new Colono(
        "Pedro",
        colonia,
        { x: 100, y: 300 }
    )

    colono2.asignarTrabajo(colonia.leñador)
    colono.asignarTrabajo(colonia.leñador)

    const casa = new Casa("Casa 1", colonia, { x: 200, y: 300 })

    mundo.agregarColono(colono)
    mundo.agregarColono(colono2)

    mundo.agregarCasa(casa)

    const gestorImagenes = new GestorImagenes()
    const renderizador = new Renderizador(canvas, gestorImagenes)

    const juego = new Juego(
        mundo,
        requestAnimationFrame,
        renderizador
    )

    if (typeof document !== "undefined") {
        const botonDebug = document.getElementById("boton-debug")

        botonDebug.addEventListener("click", () => {
            colono2.actividad=colono2.talarArboles
            colono.actividad=colono.talarArboles
        })
    }

    juego.iniciar()
}