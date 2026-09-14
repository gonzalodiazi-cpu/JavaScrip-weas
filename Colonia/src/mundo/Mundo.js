import { Arbol } from "@src/mundo/Arbol.js";
import { Recurso } from "./Recurso";
export class Mundo {
    constructor() {
        this.arboles = []
        this.recursos = []
        this.colonos = []
    }
    crearArbol(posicion) {
        const arbol = new Arbol(posicion)
        this.arboles.push(arbol)
    }
    agregarRecurso(recurso) {
        this.recursos.push(recurso)
    }
    agregarColono(colono) {
        this.colonos.push(colono)
    }

    procesarArbolesTalados() {
        const arbolesTalados = this.arboles.filter(arbol => arbol.talado)

        for (const arbol of arbolesTalados) {
            const recurso = new Recurso(
                "madera",
                arbol.madera,
                arbol.posicion
            )
            this.agregarRecurso(recurso)
        }

        this.arboles = this.arboles.filter(arbol => !arbol.talado)
    }
    actualizar() {
        for (const colono of this.colonos) {
            colono.actualizarMovimiento()
        }
    }
    
}