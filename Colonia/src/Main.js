import { Mundo } from "./mundo/Mundo.js"
import { Juego } from "./Juego.js"
import { Renderizador } from "./visualizacion/Renderizador.js"
import { Colonia } from "./sociedad/Colonia.js"
import { GestorImagenes } from "./visualizacion/GestorImagenes.js"
import { Interfaz } from "./interfaz/Interfaz.js"

export function iniciarJuego(canvas, requestAnimationFrame) {
    const mundo = new Mundo(canvas.width,canvas.height)

    for (const a of [1,2,3,4,6,7,8]) {
        for (const b of [1,2,3,4,6,7,8]) {
            mundo.crearArbol({x: a*(canvas.width/10),y:b*(canvas.height/10)})
        }
    }


    const colonia = new Colonia(mundo)

    colonia.crearCasa("Casa 1", {x:200,y:300})
    colonia.crearCasa("Casa 2", {x:200,y:500})

    colonia.ayuntamiento.capacidadCasas=9
    colonia.dinero=200
    colonia.madera=300

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

        botonDebug.addEventListener("click", () => {
            colono2.actividad = colono2.talarArboles
            colono.actividad = () => colono.recogerRecursos("Madera")
            colono3.actividad = colono3.talarArboles
            colono4.actividad = () => colono4.recogerRecursos("Madera")
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