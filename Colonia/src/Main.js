import { Mundo } from "./mundo/Mundo.js"
import { Juego } from "./Juego.js"
import { Renderizador } from "./visualizacion/Renderizador.js"
import { Colono } from "./sociedad/Colono.js"
import { Colonia } from "./sociedad/Colonia.js"

export function iniciarJuego(canvas) {
    const mundo = new Mundo()

    mundo.crearArbol({ x: 500, y: 500 })

    const arbol = mundo.arboles[0]

    const colonia = new Colonia()
    const colono = new Colono(
        "Juan",
        colonia,
        { x: 100, y: 200 }
    )

    colono.establecerDestino(arbol.posicion)

    mundo.agregarColono(colono)

    const renderizador = new Renderizador(canvas)

    const juego = new Juego(
        mundo,
        requestAnimationFrame.bind(window),
        renderizador
    )

    juego.iniciar()
}
