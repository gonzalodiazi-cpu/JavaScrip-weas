export class Renderizador {
    constructor(canvas, gestorImagenes) {
        this.canvas = canvas
        this.contexto = canvas.getContext("2d")
        this.gestorImagenes = gestorImagenes
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
        }
                
        for (const colono of mundo.colonos) {
            this.dibujarObjeto(colono)
        }
        
    }
}