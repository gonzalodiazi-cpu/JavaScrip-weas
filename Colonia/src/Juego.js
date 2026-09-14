export class Juego {
    constructor(mundo, requestAnimationFrame) {
        this.mundo=mundo
        this.requestAnimationFrame = requestAnimationFrame
    }
    actualizar() {
        this.mundo.actualizar()
    }
    iniciar() {
        this.requestAnimationFrame(() => {
            this.actualizar()
        })
    }
}
