export class Renderizador {
    constructor(canvas) {
        this.canvas = canvas
        this.contexto = canvas.getContext("2d")
    }
    dibujarColono(colono) {
        this.contexto.fillRect(
            colono.posicion.x,
            colono.posicion.y,
            10,
            10
        )
    }
    dibujarArbol(arbol) {
        this.contexto.fillRect(
            arbol.posicion.x,
            arbol.posicion.y,
            20,
            30
        )
    }
    dibujarMundo(mundo) {
        this.contexto.clearRect(0,0,this.canvas.width,this.canvas.height)

        for (const colono of mundo.colonos) {
            this.dibujarColono(colono)
        }
        for (const arbol of mundo.arboles) {
            this.dibujarArbol(arbol)
        }
    }
}