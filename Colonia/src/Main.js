import { Mundo } from "./mundo/Mundo.js"
import { Juego } from "./Juego.js"
import { Renderizador } from "./visualizacion/Renderizador.js"
import { Colonia } from "./sociedad/Colonia.js"
import { GestorImagenes } from "./visualizacion/GestorImagenes.js"
import { Interfaz } from "./interfaz/Interfaz.js"
import { Sierra } from "./maquinas/Sierra.js"
import { ActividadTalarArboles } from "./sociedad/actividades/ActividadTalarArboles.js"
import { ActividadRecogerRecursos } from "./sociedad/actividades/ActividadRecogerRecursos.js"
import { ActividadAbastecer } from "./sociedad/actividades/ActividadAbastecer.js"
import { ActividadTransferir } from "./sociedad/actividades/ActividadTransferir.js"

export function iniciarJuego(canvas, requestAnimationFrame) {
    const mundo = new Mundo(canvas.width,canvas.height)

    for (const a of [1,2,3,4,6,7,8]) {
        for (const b of [1,2,3,4,6,7,8]) {
            mundo.crearArbol({
                x: a*(canvas.width/10),
                y: b*(canvas.height/10)
            })
        }
    }

    const colonia = new Colonia(mundo)

    const sierra = new Sierra({x:500, y:600}, colonia)
    const sierra2 = new Sierra({x:500, y:900}, colonia)
    sierra.tiempoParaProcesar=1
    sierra2.tiempoParaProcesar=1
    colonia.estadisticasBaseColono.velocidad=10
    colonia.agregarMaquina(sierra)

    colonia.crearCasa("Casa 1", {x:200,y:300})
    colonia.crearCasa("Casa 2", {x:200,y:500})

    colonia.ayuntamiento.capacidadCasas=9
    colonia.dinero=200
    colonia.ayuntamiento.recibirMadera(300)

    const casa = colonia.casas.get("Casa 1")
    const casa2 = colonia.casas.get("Casa 2")

    casa.crearColono("Juan")
    casa.crearColono("Pedro")
    casa2.crearColono("Zalo")
    casa2.crearColono("Raul")

    const colono = casa.colonos.get("Juan")
    const colono2 = casa.colonos.get("Pedro")
    const colono3 = casa2.colonos.get("Zalo")
    const colono4 = casa2.colonos.get("Raul")

    colonia.estadisticasBaseColono.velocidad+=3

    colono2.asignarTrabajo(colonia.leñador)
    colono.asignarTrabajo(colonia.leñador)
    colono3.asignarTrabajo(colonia.leñador)

    const gestorImagenes = new GestorImagenes()
    const renderizador = new Renderizador(canvas, gestorImagenes)

    let interfaz = null

    if (typeof document !== "undefined") {
        const botonConstruirCasa =
            document.getElementById("boton-construir-casa")

        const inputNombre =
            document.getElementById("nombre")

        interfaz = new Interfaz(
            canvas,
            mundo,
            botonConstruirCasa,
            inputNombre
        )

        const botonDebug = document.getElementById("boton-debug")
        const botonDebug2= document.getElementById("boton-debug2")
        const botonEncender = document.getElementById("boton-encender")

        botonDebug.addEventListener("click", () => {
            colono.iniciarActividad( new ActividadAbastecer(colono, sierra))
        })
        botonEncender.addEventListener("click", () => {
            sierra.encender()
        })
    }

    const juego = new Juego(
        mundo,
        requestAnimationFrame,
        renderizador,
        interfaz
    )

    juego.iniciar()
}