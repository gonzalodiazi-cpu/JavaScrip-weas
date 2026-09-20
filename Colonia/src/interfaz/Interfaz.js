export class Interfaz {
    constructor(canvas, mundo, botonConstruirCasa, inputNombre) {
        this.canvas = canvas
        this.mundo = mundo
        this.botonConstruirCasa=botonConstruirCasa
        this.mouse = { x: 0, y: 0 }
        this.objetoSeleccionado = null
        this.construyendoCasa = false
        this.posicionCasaEnConstruccion=null
        this.nombreCasaEnConstruccion = null
        this.coloniaConstruyendoCasa=null
        this.inputNombre=inputNombre
        

        if (
            botonConstruirCasa &&
            typeof botonConstruirCasa.addEventListener === "function"
        ) {
            botonConstruirCasa.addEventListener("click", evento => {
                if (this.inputNombre) {
                    this.inputNombre.hidden = false
                }
            })
        }

        if (
            inputNombre &&
            typeof inputNombre.addEventListener === "function"
        ) {
            inputNombre.addEventListener("keydown", evento => {
                if (evento.key === "Enter") {
                    this.nombreCasaEnConstruccion = this.inputNombre.value
                    this.construyendoCasa = true
                }
            })
        }

        canvas.addEventListener("click", evento => {
            if (this.construyendoCasa) {
                this.coloniaConstruyendoCasa.crearCasa(
                    this.nombreCasaEnConstruccion,
                    this.posicionCasaEnConstruccion
                )

                this.construyendoCasa = false
                this.posicionCasaEnConstruccion = null
                this.inputNombre.hidden = true
                this.inputNombre.value = ""
                return
            }

            this.objetoSeleccionado = this.objetoBajoMouse()

            if (
                this.mundo.colonias.length > 0 &&
                this.objetoSeleccionado === this.mundo.colonias[0].ayuntamiento
            ) {
                this.botonConstruirCasa.hidden = false
                this.coloniaConstruyendoCasa =
                    this.objetoSeleccionado.colonia
            }
            else {
                this.botonConstruirCasa.hidden = true
            }
        })

    canvas.addEventListener("mousemove", evento => {
        const rect = canvas.getBoundingClientRect()

        this.mouse = {
            x: evento.clientX - rect.left,
            y: evento.clientY - rect.top
        }

        if (this.construyendoCasa) {
            this.posicionCasaEnConstruccion = {
                x: this.mouse.x,
                y: this.mouse.y
            }
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
        for (const colonia of this.mundo.colonias) {
            for (const colono of colonia.colonos) {
                if (this.colisionPosicion(colono)) {
                    return colono
                }
            }
            if (this.colisionPosicion(colonia.ayuntamiento)) {
                return colonia.ayuntamiento
            }
            for (const casa of colonia.casas.values()) {
                if (this.colisionPosicion(casa)) {
                    return casa
                }
            }
        }
        return null
    }
}