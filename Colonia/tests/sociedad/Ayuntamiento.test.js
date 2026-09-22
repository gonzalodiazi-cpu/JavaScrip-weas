import { describe, it, expect } from "vitest"
import { Ayuntamiento } from "@src/sociedad/Ayuntamiento.js"
import { Mundo } from "../../src/mundo/Mundo"
import { crearColonia } from "../helpers/crearColonia.js"
import { Recurso } from "../../src/mundo/Recurso.js"
import { Colono } from "../../src/sociedad/Colono.js"
import { Almacenamiento } from "@src/maquinas/Almacenamiento.js"

describe("Ayuntamiento", () => {
    it("Un ayuntamiento conoce a su colonia", () => {
        const colonia = crearColonia()

        expect(colonia.ayuntamiento.colonia).toBe(colonia)
    })

    it("Un ayuntamiento tiene una posición", () => {
        const mundo = new Mundo(1200,800)

        const ayuntamiento = new Ayuntamiento(mundo)

        expect(ayuntamiento.posicion).toEqual({x:600,y:400})
    })
    it("Un ayuntamiento tiene una imagen", () => {
        const mundo = new Mundo()
        const ayuntamiento = new Ayuntamiento(mundo)

        expect(ayuntamiento.imagen).toBe("Ayuntamiento")
    })

    it("Un ayuntamiento tiene un almacenamiento", () => {
        const colonia = crearColonia()
        const ayuntamiento = new Ayuntamiento(new Mundo(), colonia)

        expect(ayuntamiento.almacenamiento).toBeInstanceOf(Almacenamiento)
    })

    it("El ayuntamiento recibe madera para su almacenamiento", () => {
        const colonia = crearColonia()

        colonia.ayuntamiento.recibirMadera(10)

        expect(
            colonia.ayuntamiento.almacenamiento.consultarCantidad("Madera")
        ).toBe(10)
    })

    it("El ayuntamiento recibe la madera del inventario", () => {
        const colonia = crearColonia()

        const recurso = new Recurso("Madera", 10, {x: 0, y: 0})
        const colono = new Colono("Juan", colonia, {x: 0, y: 0})

        colono.inventario.recogerRecurso(recurso)

        colonia.ayuntamiento.recibirInventario(colono.inventario)

        expect(
            colonia.ayuntamiento.almacenamiento.consultarCantidad("Madera")
        ).toBe(10)
    })

    it("Al recibir un inventario, el ayuntamiento retira la madera del inventario", () => {
        const colonia = crearColonia()

        const recurso = new Recurso("Madera", 10, {x: 0, y: 0})
        const colono = new Colono("Juan", colonia, {x: 0, y: 0})

        colono.inventario.recogerRecurso(recurso)

        colonia.ayuntamiento.recibirInventario(colono.inventario)

        expect(
            colono.inventario.consultarCantidad("Madera")
        ).toBe(0)
    })

})