export class Almacenamiento {
    constructor(capacidadesBase, factor = 1) {
        this.capacidades = this._crearCapacidades(capacidadesBase, factor)
        this.recursos = new Map()
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
    tiene(tipo, cantidad) {
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