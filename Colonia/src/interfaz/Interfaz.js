export class Interfaz {
    constructor(canvas, mundo, botonConstruirCasa) {
        this.canvas = canvas
        this.mundo = mundo
        this.botonConstruirCasa=botonConstruirCasa
        this.mouse = { x: 0, y: 0 }
        this.objetoSeleccionado = null
        this.construyendoCasa = false

        if (
            botonConstruirCasa &&
            typeof botonConstruirCasa.addEventListener === "function"
        ) {
            botonConstruirCasa.addEventListener("click", evento => {
                this.construyendoCasa = true
            })
        }

        canvas.addEventListener("click", evento => {
            this.objetoSeleccionado = this.objetoBajoMouse()
            if (
                this.mundo.colonias.length > 0 &&
                this.objetoSeleccionado === this.mundo.colonias[0].ayuntamiento
            ) {
                this.botonConstruirCasa.hidden = false
            }
            else {
                this.botonConstruirCasa.hidden = true
            }
        })

        canvas.addEventListener("mousemove", evento => {
            this.mouse = {
                x:evento.clientX,
                y:evento.clientY
            }
        })
    }
    colisionPosicion(objeto) {
        if (
        objeto.posicion.x - objeto.ancho / 2 <= this.mouse.x &&
        this.mouse.x <= objeto.posicion.x + objeto.ancho / 2 &&
        objeto.posicion.y - objeto.alto <= this.mouse.y &&
        this.mouse.y <= objeto.posicion.y
        )
        return true
    }
    objetoBajoMouse() {
        for (const colono of this.mundo.colonos) {
            if (this.colisionPosicion(colono)) {
                return colono
            }
        }
        for (const colonia of this.mundo.colonias) {
            if (this.colisionPosicion(colonia.ayuntamiento)) {
                return colonia.ayuntamiento
            }
            for (const casa of colonia.casas.values()) {
                if (this.colisionPosicion(casa)) {
                    return casa
                }
            }
        }
        for (const objeto of this.mundo.objetos) {
            if (this.colisionPosicion(objeto)) {
                return objeto
            }
        }
        return null
    }
}