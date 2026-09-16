export class EstadisticasColono {
    constructor(base, trabajo) {
        this.base=base
        this.trabajo=trabajo
    }
    get velocidad() {
        return this.base.velocidad + this.trabajo.modificadorVelocidad
    }
    get dañoTala() {
        return this.base.dañoTala + this.trabajo.modificadorDañoTala
    }
    get velocidadTala() {
        return this.base.velocidadTala + this.trabajo.modificadorVelocidadTala
    }
}