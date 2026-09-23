import { Inventario } from "../inventario/Inventario.js"
import { Almacenamiento } from "../maquinas/Almacenamiento.js"
export class Ayuntamiento {
    constructor(mundo, colonia) {
        this.posicion= {
            x : mundo.ancho /2,
            y : mundo.alto/2
        }
        this.capacidadCasas = 2
        this.imagen="Ayuntamiento"
        this.ancho=200
        this.alto=200
        this.colonia=colonia
        this.almacenamiento = new Almacenamiento(new Map([["Madera", Infinity],["Tablas",Infinity]]))
    }

    get madera() {
        return this.almacenamiento.consultarCantidad("Madera")
    }

    get tablas() {
        return this.almacenamiento.consultarCantidad("Tablas")
    }
    
    recibirMadera(cantidad) {
        this.almacenamiento.guardar("Madera", cantidad)
    }
    recibirInventario(inventario) {
        const madera = inventario.consultarCantidad("Madera")
        const tablas = inventario.consultarCantidad("Tablas")
        
        inventario.entregarAAlmacenamiento(this.almacenamiento, "Madera", madera)
        inventario.entregarAAlmacenamiento(this.almacenamiento, "Tablas", tablas)
        
    }
}