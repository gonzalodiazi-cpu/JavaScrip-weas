import { Inventario } from "../../src/inventario/Inventario.js"
export function crearInventario() {
    const estadisticas = {
        capacidadSlotsInventario: 10,
        cantidadSlotsInventario: 5
    }

    return new Inventario(estadisticas)
}