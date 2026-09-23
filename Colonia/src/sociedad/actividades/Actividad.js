export class Actividad {
    constructor(colono) {
        this.colono = colono
        this.mundo = colono.colonia.mundo
        this.resultadosActividadesSecundarias = []
    }

    get imagen() {
        return this.colono.trabajo.imagen
    }

    get actividadAnterior() {
        if (this.colono.actividades === undefined) {
            return null
        }

        return this.colono.actividades.at(-2) ?? null
    }

    buscarYReservar(objetos) {
        this.colono.buscarOptimo(objetos)

        if (this.colono.objetivo !== null) {
            this.colono.objetivo.asignarResponsable(this.colono)
        }
    }

    liberarObjetivoSiDescartable() {
        if (this.colono.objetivo?.descartable) {
            this.colono.liberarObjetivo()
        }
    }

    puedeRecibirDesdeAlmacen(almacenamiento, tipo, cantidad) {
        return this.colono.inventario.puedeRecibirDesdeAlmacen(
            almacenamiento,
            tipo,
            cantidad
        )
    }

    puedeEntregarAAlmacen(almacenamiento, tipo, cantidad) {
        return this.colono.inventario.puedeEntregarAAlmacen(
            almacenamiento,
            tipo,
            cantidad
        )
    }

    recibirDesdeAlmacenamiento(almacenamiento, tipo, cantidad) {
        this.colono.inventario.recibirDesdeAlmacenamiento(
            almacenamiento,
            tipo,
            cantidad
        )
    }

    entregarAAlmacenamiento(almacenamiento, tipo, cantidad) {
        this.colono.inventario.entregarAAlmacenamiento(
            almacenamiento,
            tipo,
            cantidad
        )
    }

    esTransferible(origen, destino, tipo, cantidad) {
        return (
            origen.consultarCantidadSacable(tipo, cantidad) === cantidad &&
            destino.consultarCantidadGuardable(tipo, cantidad) === cantidad
        )
    }

    esTransportable(origen, destino, tipo, cantidad) {
        return (
            this.esTransferible(
                origen,
                destino,
                tipo,
                cantidad
            ) &&
            this.puedeRecibirDesdeAlmacen(
                origen,
                tipo,
                cantidad
            )
        )
    }
    
    iniciarActividadSecundaria(actividad) {
        this.colono.iniciarActividad(actividad)
    }

    recibirResultadoActividadSecundaria(resultado) {
        this.resultadosActividadesSecundarias.push(resultado)
    }

    terminarActividad() {
        const actividadAnterior = this.actividadAnterior

        this.colono.terminarActividad()

        if (actividadAnterior !== null) {
            actividadAnterior.recibirResultadoActividadSecundaria(
                this.resultado
            )
        }
    }
}