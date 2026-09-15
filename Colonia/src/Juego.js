export class Juego {
    constructor(mundo, requestAnimationFrame, renderizador) {
        this.mundo = mundo
        this.requestAnimationFrame = requestAnimationFrame
        this.renderizador = renderizador
    }

    actualizar(deltaTime) {
        this.mundo.actualizar(deltaTime)

        if (this.renderizador) {
            this.renderizador.dibujarMundo(this.mundo)
        }
    }

    iniciar() {
        let tiempoAnterior=null
        const actualizar = (tiempoActual) => {
            if (tiempoAnterior==null) {
                tiempoAnterior=tiempoActual
            }

            const deltaTime=tiempoActual-tiempoAnterior
            tiempoAnterior=tiempoActual

            this.actualizar(deltaTime)
            this.requestAnimationFrame(actualizar)
        }

        this.requestAnimationFrame(actualizar)
    }
}