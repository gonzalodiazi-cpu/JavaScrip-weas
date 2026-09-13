let puntos = 0

let textoPuntos= document.getElementById("puntos")
let puntuacionFinal = document.getElementById("puntuacionFinal")
let interfazJuego = document.getElementById("interfaz_principio")

function sumarPunto() {
    console.log("click")

    puntos += 1

    textoPuntos.textContent = "Puntos: " + puntos


    if (juegoEmpezado==false) {
        juegoEmpezado=true
        intervalo= setInterval(restarTiempo, 1000)
    }

    moverCuadrado()
}

cuadrado.addEventListener("click", sumarPunto)

moverCuadrado()