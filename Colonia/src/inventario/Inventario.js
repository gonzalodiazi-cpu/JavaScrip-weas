export class Inventario {
    constructor(estadisticas) {
        this.estadisticas = estadisticas
        this.recursos = new Map()
    }

    get cantidadSlotsInventario() {
        return this.estadisticas.cantidadSlotsInventario
    }
    get capacidadSlotsInventario() {
        return this.estadisticas.capacidadSlotsInventario
    }

    agregar(recurso) {
        const cantidadInicial = this.recursos.get(recurso.tipo) ?? 0
        const cantidadActual = cantidadInicial + recurso.cantidad
        this.recursos.set(recurso.tipo,cantidadActual)
    }
}