import { Arbol } from "./Arbol.js";
import { Recurso } from "./Recurso.js";
export class Mundo {
    constructor(ancho,alto) {
        this.arboles = []
        this.recursos = []
        this.colonias=[]
        this.ancho = ancho
        this.alto=alto
    }
    crearArbol(posicion) {
        const arbol = new Arbol(posicion)
        this.arboles.push(arbol)
    }
    agregarRecurso(recurso) {
        this.recursos.push(recurso)
    }
    agregarColonia(colonia) {
        this.colonias.push(colonia)
    }

    procesarArbolesTalados() {
        const arbolesTalados = this.arboles.filter(arbol => arbol.talado)

        for (const arbol of arbolesTalados) {
            const recurso = new Recurso(
                "Madera",
                arbol.madera,
                arbol.posicion
            )
            this.agregarRecurso(recurso)
        }

        this.arboles = this.arboles.filter(arbol => !arbol.talado)
    }
    procesarRecursosAgotados() {

        this.recursos = this.recursos.filter(recurso => !recurso.agotado)
    }
    actualizar(deltaTime) {
        const deltaTimeEnSegundos=deltaTime/1000
        for (const arbol of this.arboles)
            arbol.actualizar(deltaTimeEnSegundos)
        for (const colonia of this.colonias) {
            colonia.actualizar(deltaTimeEnSegundos)
        }
        this.procesarArbolesTalados()
        this.procesarRecursosAgotados()
    }
    
}