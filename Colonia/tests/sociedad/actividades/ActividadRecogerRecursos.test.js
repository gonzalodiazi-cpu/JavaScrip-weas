import { describe, it, expect } from "vitest"
import { ActividadRecogerRecursos } from "@src/sociedad/actividades/ActividadRecogerRecursos.js"
import { Colono } from "@src/sociedad/Colono.js"
import { Recurso } from "@src/mundo/Recurso.js"
import { crearColonia } from "../../helpers/crearColonia.js"

describe("ActividadRecogerRecursos", () => {
    it("Un colono conserva la imagen de su trabajo al recoger recursos", () => {
        const colonia = crearColonia()
        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadRecogerRecursos(colono, "Madera")
        colono.actividad = actividad

        expect(colono.imagen).toBe(colonia.desempleado.imagen)
    })
    it("Un colono elige un recurso del tipo que está buscando", () => {
        const colonia = crearColonia()

        const madera = new Recurso("Madera", 10, { x: 100, y: 0 })
        const piedra = new Recurso("Piedra", 10, { x: 5, y: 0 })

        colonia.mundo.agregarRecurso(madera)
        colonia.mundo.agregarRecurso(piedra)

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadRecogerRecursos(
            colono,
            "Madera"
        )

        actividad.actualizar()

        expect(colono.objetivo).toBe(madera)
    })


    it("Un colono recoge su recurso objetivo cuando llega a él", () => {
        const colonia = crearColonia()

        const recurso = new Recurso(
            "Madera",
            8,
            { x: 0, y: 0 }
        )

        colonia.mundo.agregarRecurso(recurso)

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadRecogerRecursos(
            colono,
            "Madera"
        )

        actividad.actualizar()
        actividad.actualizar()

        expect(colono.inventario.consultarCantidad("Madera")).toBe(8)
    })

    it("Un colono libera su recurso objetivo cuando lo recoge completamente", () => {
        const colonia = crearColonia()

        const recurso = new Recurso(
            "Madera",
            8,
            { x: 0, y: 0 }
        )

        colonia.mundo.agregarRecurso(recurso)

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadRecogerRecursos(
            colono,
            "Madera"
        )

        actividad.actualizar()
        actividad.actualizar()

        expect(recurso.descartable).toBe(true)
        expect(recurso.responsable).toBeNull()
        expect(colono.objetivo).toBeNull()
    })

    it("Un colono va al ayuntamiento cuando no puede recoger más madera", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        colono.inventario.recogerRecurso(
            new Recurso("Madera", 50, { x: 0, y: 0 })
        )

        const madera = new Recurso(
            "Madera",
            10,
            { x: 100, y: 0 }
        )

        colonia.mundo.agregarRecurso(madera)

        const actividad = new ActividadRecogerRecursos(
            colono,
            "Madera"
        )

        actividad.actualizar()
        actividad.actualizar()

        expect(colono.destino).toBe(colonia.ayuntamiento.posicion)
    })
    it("Un colono deposita su madera al llegar al ayuntamiento", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            colonia.ayuntamiento.posicion
        )

        const recurso = new Recurso(
            "Madera",
            10,
            { x: 0, y: 0 }
        )

        colono.inventario.recogerRecurso(recurso)

        const actividad = new ActividadRecogerRecursos(
            colono,
            "Madera"
        )

        actividad.actualizar()

        expect(colonia.madera).toBe(10)
        expect(colono.inventario.tiene("Madera")).toBe(false)
    })
    it("Un colono termina la actividad cuando no queda madera en el mundo ni en su inventario", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            colonia.ayuntamiento.posicion
        )

        const actividad = new ActividadRecogerRecursos(
            colono,
            "Madera"
        )

        colono.actividad = actividad

        actividad.actualizar()

        expect(colono.actividad).toBeNull()
    })

    it("Un colono vuelve a buscar madera después de depositarla", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            colonia.ayuntamiento.posicion
        )

        const maderaInventario = new Recurso(
            "Madera",
            10,
            { x: 0, y: 0 }
        )

        colono.inventario.recogerRecurso(maderaInventario)

        const maderaDisponible = new Recurso(
            "Madera",
            10,
            { x: 100, y: 0 }
        )

        colonia.mundo.agregarRecurso(maderaDisponible)

        const actividad = new ActividadRecogerRecursos(
            colono,
            "Madera"
        )

        actividad.actualizar()

        expect(colono.inventario.tiene("Madera")).toBe(false)
        expect(colono.objetivo).toBe(maderaDisponible)
        expect(colono.destino).toBe(maderaDisponible.posicion)
    })
    it("Un colono va al ayuntamiento si su inventario ya está lleno", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        colono.inventario.recogerRecurso(
            new Recurso("Madera", 50, { x: 0, y: 0 })
        )

        const madera = new Recurso(
            "Madera",
            10,
            { x: 100, y: 0 }
        )

        colonia.mundo.agregarRecurso(madera)

        const actividad = new ActividadRecogerRecursos(
            colono,
            "Madera"
        )

        actividad.actualizar()

        expect(colono.objetivo).toBeNull()
        expect(colono.destino).toBe(colonia.ayuntamiento.posicion)
    })

    it("Un colono va al ayuntamiento cuando no queda madera en el mundo pero tiene madera en su inventario", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        colono.inventario.recogerRecurso(
            new Recurso("Madera", 10, { x: 0, y: 0 })
        )

        const actividad = new ActividadRecogerRecursos(
            colono,
            "Madera"
        )

        actividad.actualizar()

        expect(colono.objetivo).toBeNull()
        expect(colono.destino).toBe(colonia.ayuntamiento.posicion)
    })
})