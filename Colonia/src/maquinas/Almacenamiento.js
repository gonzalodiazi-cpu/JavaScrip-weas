export class Almacenamiento {
    constructor(capacidadesBase, factor = 1, permiteNuevosTipos=false) {
        this.capacidades = this._crearCapacidades(capacidadesBase, factor)
        this.recursos = new Map()
        this.permiteNuevosTipos=permiteNuevosTipos
    }


    //Métodos de construcción
    _crearCapacidades(capacidadesBase, factor) {
        const capacidades = new Map()

        for (const [tipo, cantidad] of capacidadesBase) {
            capacidades.set(tipo, cantidad * factor)
        }

        return capacidades
    }

    //Métodos de clase
    establecerCapacidad(tipo, cantidad) {
        if (!this.permiteNuevosTipos && !this.capacidades.has(tipo)) {
            return
        }
        this.capacidades.set(tipo, cantidad)
    }

    tiene(tipo, cantidad=1) {
        return (this.recursos.get(tipo) ?? 0) >= cantidad
    }

    consultarCantidadGuardable(tipo, cantidadSolicitada) {
        cantidadSolicitada=Math.max(0,cantidadSolicitada)

        const capacidad = this.capacidades.get(tipo) ?? 0
        const cantidadActual = this.recursos.get(tipo) ?? 0
        const capacidadDisponible = capacidad - cantidadActual

        return Math.min(
            cantidadSolicitada,
            capacidadDisponible
        )
    }

    consultarCantidad(tipo) {
        return this.recursos.get(tipo) ?? 0
    }

    consultarTipos() {
        return [...this.recursos.keys()]
    }

    consultarCantidadSacable(tipo, cantidadSolicitada) {
        cantidadSolicitada = Math.max(0,cantidadSolicitada)
        const cantidadActual = this.recursos.get(tipo) ?? 0

        if (cantidadSolicitada>cantidadActual) {
            return 0
        }

        return cantidadSolicitada
    }
    
    
    guardar(tipo, cantidadPorGuardar) {
        const cantidadActual = this.recursos.get(tipo) ?? 0
        const cantidadGuardable =
            this.consultarCantidadGuardable(tipo, cantidadPorGuardar)
        if (cantidadGuardable===0) {
            return
        }
        this.recursos.set(tipo, cantidadActual+cantidadGuardable)
    }

    sacar(tipo, cantidadPorSacar) {
        const cantidadActual = this.recursos.get(tipo) ?? 0
        const cantidadSacable = this.consultarCantidadSacable(tipo, cantidadPorSacar)

        if (cantidadSacable===0) {
            return
        }

        if (cantidadSacable===cantidadActual) {
            this.recursos.delete(tipo)
            return
        }
        this.recursos.set(tipo, cantidadActual-cantidadSacable)
    }
    
}