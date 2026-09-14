export class Juego {
    constructor(mundo, requestAnimationFrame) {
        this.mundo=mundo
        this.requestAnimationFrame = requestAnimationFrame
    }
    actualizar() {
        this.mundo.actualizar()
    }
    iniciar() {
        const actualizar = () => {
            this.actualizar()
            this.requestAnimationFrame(actualizar)
        }

        this.requestAnimationFrame(actualizar)
    }
}
