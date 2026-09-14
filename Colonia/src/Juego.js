export class Juego {
    constructor(mundo, requestAnimationFrame, renderizador) {
        this.mundo = mundo
        this.requestAnimationFrame = requestAnimationFrame
        this.renderizador = renderizador
    }

    actualizar() {
        this.mundo.actualizar()

        if (this.renderizador) {
            this.renderizador.dibujarMundo(this.mundo)
        }
    }

    iniciar() {
        const actualizar = () => {
            this.actualizar()
            this.requestAnimationFrame(actualizar)
        }

        this.requestAnimationFrame(actualizar)
    }
}