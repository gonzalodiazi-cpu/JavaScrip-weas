let tiempo = 5
let juegoEmpezado =false
let intervalo

let pantallaGameOver = document.getElementById("gameOver")
let textoTiempo = document.getElementById("tiempo")


function restarTiempo() {
    tiempo-=1
    textoTiempo.textContent = "Tiempo: " + tiempo
    if (tiempo<=0) {
        clearInterval(intervalo)
        cuadrado.removeEventListener("click", sumarPunto)
        pantallaGameOver.style.display = "block"
        puntuacionFinal.textContent = puntos
        juego.style.display = "None"
        interfazJuego.style.display = "None"

    }
}
