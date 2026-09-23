import { Casa } from "../sociedad/Casa.js"
export class Renderizador {
    constructor(canvas, gestorImagenes) {
        this.canvas = canvas
        this.contexto = canvas.getContext("2d")
        this.gestorImagenes = gestorImagenes
        this.mouse = { x: 0, y: 0 }

        if (canvas.addEventListener) {
            canvas.addEventListener("mousemove", evento => {
                const rect = canvas.getBoundingClientRect()

                this.mouse = {
                    x: evento.clientX - rect.left,
                    y: evento.clientY - rect.top
                }
            })
        }
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

        const x = posicion.x
        const y = posicion.y - 60
        const ancho = 180
        const alto = 45

        this.contexto.fillStyle = "rgba(30, 30, 30, 0.9)"
        this.contexto.fillRect(x, y, ancho, alto)

        this.contexto.strokeStyle = "white"
        this.contexto.lineWidth = 2
        this.contexto.strokeRect(x, y, ancho, alto)

        this.contexto.fillStyle = "white"
        this.contexto.font = "18px Arial"

        this.contexto.fillText(
            `🪵 Madera: ${ayuntamiento.colonia.madera} and tablas: ${ayuntamiento.tablas}`,
            x + 12,
            y + 29
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

    dibujarCasaEnConstruccion(interfaz) {
        const casa = new Casa(null, null, interfaz.posicionCasaEnConstruccion)

        casa.imagen = "Casa_Construccion"

        this.dibujarObjeto(casa)
    }

    dibujarMundo(mundo, interfaz=null) {
        this.contexto.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        )
        for (const arbol of mundo.arboles) {
            this.dibujarObjeto(arbol)
        }

        for (const recurso of mundo.recursos) {
            this.dibujarObjeto(recurso)
        }
                
        if (interfaz!==null && interfaz.posicionCasaEnConstruccion !== null) {
            this.dibujarCasaEnConstruccion(interfaz)
        }

        for (const colonia of mundo.colonias) {
            colonia.paraCadaObjetoDibujable(
                objeto => this.dibujarObjeto(objeto)
            )
            this.dibujarInformacionAyuntamiento(colonia.ayuntamiento)
        }
        
    }

    
}