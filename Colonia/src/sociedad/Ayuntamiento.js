import { Inventario } from "../inventario/Inventario.js"
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
    }
    
    recibirMadera(cantidad) {
        this.colonia.madera+=cantidad
    }
    recibirInventario(inventario) {
        const madera = inventario.consultarCantidad("Madera")
        this.recibirMadera(madera)
        inventario.eliminarTipo("Madera")
    }
}