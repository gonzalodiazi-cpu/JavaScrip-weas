let cuadrado = document.getElementById("cuadrado")
let juego = document.getElementById("juego")

function moverCuadrado() {

    cuadrado.classList.remove("rojo","verde","azul")
    
    let numero = Math.random()

    if (numero<0.33) {
        cuadrado.classList.add("rojo")
    } else if (numero<0.66) {
        cuadrado.classList.add("verde")
    } else {
        cuadrado.classList.add("azul")
    }
    
    cuadrado.style.left = Math.random() * (juego.clientWidth - cuadrado.offsetWidth) + "px"
    cuadrado.style.top = Math.random() * (juego.clientHeight - cuadrado.offsetHeight) + "px"
}