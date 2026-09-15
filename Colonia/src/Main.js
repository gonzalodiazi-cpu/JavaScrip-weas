import { Mundo } from "./mundo/Mundo.js"
import { Juego } from "./Juego.js"
import { Renderizador } from "./visualizacion/Renderizador.js"
import { Colono } from "./sociedad/Colono.js"
import { Colonia } from "./sociedad/Colonia.js"
import {Leñador} from "./sociedad/trabajos/Leñador.js"
import { Trabajo } from "./sociedad/trabajos/Trabajo.js"
import { GestorImagenes } from "./visualizacion/GestorImagenes.js"

export function iniciarJuego(canvas, requestAnimationFrame) {
    const mundo = new Mundo()

    mundo.crearArbol({ x: 900, y: 500 })

    const arbol = mundo.arboles[0]
    arbol.crecer()
    arbol.crecer()
    

    const colonia = new Colonia()
    const colono = new Colono(
        "Juan",
        colonia,
        { x: 100, y: 200 }
    )
    const colono2= new Colono(
        "Diego",
        colonia,
        { x:900, y: 100 }
    )
    const colono3= new Colono(
        "Diegos",
        colonia,
        { x:1200, y: 100 }
    )
    const colono4= new Colono(
        "Diego",
        colonia,
        { x:200, y: 100 }
    )

    const trabajo = new Leñador()

    colono2.asignarTrabajo(trabajo)

    colono.establecerDestino(arbol.posicion)

    colono2.establecerDestino(arbol.posicion)
    colono3.establecerDestino(arbol.posicion)
    colono4.establecerDestino(arbol.posicion)

    mundo.agregarColono(colono)
    mundo.agregarColono(colono2)
    mundo.agregarColono(colono3)
    mundo.agregarColono(colono4)

    const gestorImagenes = new GestorImagenes()
    const renderizador = new Renderizador(canvas, gestorImagenes)

    const juego = new Juego(
        mundo,
        requestAnimationFrame,
        renderizador
    )

    juego.iniciar()
}
