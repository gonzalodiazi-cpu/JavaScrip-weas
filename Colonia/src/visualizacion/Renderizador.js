export class Renderizador {
    constructor(canvas, gestorImagenes) {
        this.canvas = canvas
        this.contexto = canvas.getContext("2d")
        this.gestorImagenes = gestorImagenes
    }
    obtPosDib(objeto) {
        return {
            x: objeto.posicion.x - objeto.ancho/2,
            y: objeto.posicion.y - objeto.alto
        }
    }
    dibujarColono(colono) {
        const imagen = this.gestorImagenes.obtener(colono.trabajo.imagen)
        const posicion = this.obtPosDib(colono)
        this.contexto.drawImage(
            imagen,
            posicion.x,
            posicion.y,
            colono.ancho,
            colono.alto
        )
    }
    
    dibujarArbol(arbol) {
        const imagen = this.gestorImagenes.obtener(
            `Arbol_etapa_${arbol.etapaCrecimiento}`
        )
        const posicion = this.obtPosDib(arbol)

        this.contexto.drawImage(
            imagen,
            posicion.x,
            posicion.y,
            arbol.ancho,
            arbol.alto
        )
    }
    dibujarMundo(mundo) {
        this.contexto.clearRect(0,0,this.canvas.width,this.canvas.height)

        for (const arbol of mundo.arboles) {
            this.dibujarArbol(arbol)
        }
        for (const colono of mundo.colonos) {
            this.dibujarColono(colono)
        }
        
    }
}