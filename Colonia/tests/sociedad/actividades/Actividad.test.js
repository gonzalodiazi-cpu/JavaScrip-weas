// tests/sociedad/actividades/Actividad.test.js

import { describe, it, expect } from "vitest"
import { Actividad } from "@src/sociedad/actividades/Actividad.js"
import { Colono } from "@src/sociedad/Colono.js"
import { Arbol } from "@src/mundo/Arbol.js"
import { crearColonia } from "../../helpers/crearColonia.js"

describe("Actividad", () => {
    it("Una actividad puede buscar y reservar un objetivo", () => {
        const colonia = crearColonia()

        const arbol = new Arbol({ x: 5, y: 0 })
        colonia.mundo.arboles.push(arbol)

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new Actividad(colono)

        actividad.buscarYReservar([arbol])

        expect(colono.objetivo).toBe(arbol)
        expect(arbol.responsable).toBe(colono)
    })
})