export class Renderizador {
    constructor(canvas, gestorImagenes) {
        this.canvas = canvas
        this.contexto = canvas.getContext("2d")
        this.gestorImagenes = gestorImagenes
        this.mouse = { x: 0, y: 0 }

        canvas.addEventListener("mousemove", evento => {
            const rect = canvas.getBoundingClientRect()

            this.mouse = {
                x: evento.clientX - rect.left,
                y: evento.clientY - rect.top
            }
        })
    }
    mouseSobre(objeto) {
        const posicion = this.obtPosDib(objeto)

        return (
            this.mouse.x >= posicion.x &&
            this.mouse.x <= posicion.x + objeto.ancho &&
            this.mouse.y >= posicion.y &&
            this.mouse.y <= posicion.y + objeto.alto
        )
    }
    dibujarInformacionAyuntamiento(ayuntamiento) {
        if (!this.mouseSobre(ayuntamiento)) {
            return
        }

        const posicion = this.obtPosDib(ayuntamiento)

        this.contexto.fillStyle = "white"
        this.contexto.fillRect(
            posicion.x,
            posicion.y - 50,
            160,
            40
        )

        this.contexto.fillStyle = "black"
        this.contexto.font = "20px Arial"
        this.contexto.fillText(
            `Madera: ${ayuntamiento.colonia.madera}`,
            posicion.x + 10,
            posicion.y - 23
        )
    }

    obtPosDib(objeto) {
        return {
            x: objeto.posicion.x - objeto.ancho / 2,
            y: objeto.posicion.y - objeto.alto
        }
    }

    dibujarObjeto(objeto) {
        const imagen = this.gestorImagenes.obtener(objeto.imagen)
        const posicion = this.obtPosDib(objeto)

        this.contexto.drawImage(
            imagen,
            posicion.x,
            posicion.y,
            objeto.ancho,
            objeto.alto
        )
    }

    dibujarMundo(mundo) {
        this.contexto.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        )

        for (const casa of mundo.casas) {
            this.dibujarObjeto(casa)
        }

        for (const arbol of mundo.arboles) {
            this.dibujarObjeto(arbol)
        }

        for (const recurso of mundo.recursos) {
            this.dibujarObjeto(recurso)
        }
        for (const ayuntamiento of mundo.ayuntamientos) {
            this.dibujarObjeto(ayuntamiento)
            this.dibujarInformacionAyuntamiento(ayuntamiento)
        }
                
        for (const colono of mundo.colonos) {
            this.dibujarObjeto(colono)
        }
        
    }
}