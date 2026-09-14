import { Mundo } from "@src/mundo/Mundo.js"
import { Juego } from "@src/Juego.js"
import { Renderizador } from "@src/visualizacion/Renderizador.js"
import { Colono } from "@src/sociedad/Colono.js"
import { Colonia } from "@src/sociedad/Colonia.js"

export function iniciarJuego(canvas) {
    const mundo = new Mundo()

    mundo.crearArbol({ x: 300, y: 200 })

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
        requestAnimationFrame,
        renderizador
    )

    juego.iniciar()
}
