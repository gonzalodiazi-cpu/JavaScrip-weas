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
    dibujarCasa(casa) {
        const imagen = this.gestorImagenes.obtener("Casa")
        const posicion = this.obtPosDib(casa)
        this.contexto.drawImage(
            imagen,
            posicion.x,
            posicion.y,
            casa.ancho,
            casa.alto
        )
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
    dibujarRecurso(recurso) {
        const imagen = this.gestorImagenes.obtener(
            recurso.tipo.charAt(0).toUpperCase() + recurso.tipo.slice(1)
        )

        const posicion = this.obtPosDib(recurso)

        this.contexto.drawImage(
            imagen,
            posicion.x,
            posicion.y,
            recurso.ancho,
            recurso.alto
        )
    }
        dibujarMundo(mundo) {
        this.contexto.clearRect(0,0,this.canvas.width,this.canvas.height)
        for (const casa of mundo.casas) {
            this.dibujarCasa(casa)
        }

        for (const arbol of mundo.arboles) {
            this.dibujarArbol(arbol)
        }
        
        for (const recurso of mundo.recursos) {
            this.dibujarRecurso(recurso)
        }

        for (const colono of mundo.colonos) {
            this.dibujarColono(colono)
        }
        
    }
}