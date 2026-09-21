// tests/helpers/crearMundo.js
import { Mundo } from "@src/mundo/Mundo.js"

export function crearMundo(ancho=1200,alto=800) {
    return new Mundo(ancho,alto)
}