import { MaquinaProcesadora } from "./MaquinaProcesadora.js"
import { Receta } from "./Receta.js"


export class Sierra extends MaquinaProcesadora {
    constructor(posicion, colonia=null) {
        const receta = new Receta( new Map([["Madera",10]]), new Map([["Tablas", 5]]))
        super(receta, colonia)
        this.tiempoParaProcesar=5
        this.posicion=posicion
        this.ancho = 200
        this.alto = 200
    }
    get imagen() {
        return "Sierra_" + this.estado
    }
}