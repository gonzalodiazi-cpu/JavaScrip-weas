export class Interfaz {
    constructor(canvas, mundo) {
        this.canvas = canvas
        this.mundo = mundo
        this.mouse = { x: 0, y: 0 }
        this.objetoSeleccionado = null

        canvas.addEventListener("click", evento => {
            this.objetoSeleccionado = this.objetoBajoMouse( )
        })

        canvas.addEventListener("mousemove", evento => {
            this.mouse = {
                x:evento.clientX,
                y:evento.clientY
            }
        })
    }
    objetoBajoMouse() {
        for (const colono of this.mundo.colonos) {
            if (
                colono.posicion.x - colono.ancho / 2 <= this.mouse.x &&
                this.mouse.x <= colono.posicion.x + colono.ancho / 2 &&
                colono.posicion.y - colono.alto <= this.mouse.y &&
                this.mouse.y <= colono.posicion.y
            ) {
                return colono
            }
        }
        for (const objeto of this.mundo.objetos) {
            if (
                objeto.posicion.x - objeto.ancho / 2 <= this.mouse.x &&
                this.mouse.x <= objeto.posicion.x + objeto.ancho / 2 &&
                objeto.posicion.y - objeto.alto <= this.mouse.y &&
                this.mouse.y <= objeto.posicion.y
            ) {
                return objeto
            }
        }
        return null
    }
}