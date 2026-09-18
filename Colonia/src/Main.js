import { Mundo } from "./mundo/Mundo.js"
import { Juego } from "./Juego.js"
import { Renderizador } from "./visualizacion/Renderizador.js"
import { Colono } from "./sociedad/Colono.js"
import { Colonia } from "./sociedad/Colonia.js"
import { GestorImagenes } from "./visualizacion/GestorImagenes.js"
import { Casa } from "./sociedad/Casa.js"

export function iniciarJuego(canvas, requestAnimationFrame) {
    const mundo = new Mundo(canvas.width,canvas.height)

    for (const a of [1,2,3,4,6,7,8]) {
        for (const b of [1,2,3,4,6,7,8]) {
            mundo.crearArbol({x: a*(canvas.width/10),y:b*(canvas.height/10)})
        }
    }


    const colonia = new Colonia(mundo)
    mundo.agregarColonia(colonia)

    colonia.crearCasa("Casa 1", {x:200,y:300})

    const casa = colonia.casas.get("Casa 1")

    casa.crearColono("Juan")
    casa.crearColono("Pedro")

    const colono = casa.colonos.get("Juan")
    const colono2 = casa.colonos.get("Pedro")

    colonia.estadisticasBaseColono.velocidad+=20

    colono2.asignarTrabajo(colonia.leñador)
    colono.asignarTrabajo(colonia.leñador)


    mundo.agregarColono(colono)
    mundo.agregarColono(colono2)



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
            colono.actividad= colono.actividad = () => colono.recogerRecursos("Madera")
        })
    }

    juego.iniciar()
}