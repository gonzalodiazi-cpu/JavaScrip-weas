import { describe, it, expect } from "vitest"
import { ActividadTalarArboles } from "@src/sociedad/actividades/ActividadTalarArboles.js"
import { Colono } from "@src/sociedad/Colono.js"
import { Arbol } from "@src/mundo/Arbol.js"
import { crearColonia } from "../../helpers/crearColonia.js"

describe("ActividadTalarArboles", () => {
    it("Un colono puede elegir el árbol disponible más cercano", () => {
        const colonia = crearColonia()

        const arbolLejano = new Arbol({ x: 20, y: 0 })
        const arbolCercano = new Arbol({ x: 5, y: 0 })

        colonia.mundo.arboles.push(
            arbolLejano,
            arbolCercano
        )

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadTalarArboles(colono)

        actividad.actualizar()

        expect(colono.objetivo).toBe(arbolCercano)
    })

    it("Un colono tala su árbol objetivo cuando llega a él", () => {
        const colonia = crearColonia()
        const arbol = new Arbol({ x: 0, y: 0 })

        colonia.mundo.arboles.push(arbol)

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadTalarArboles(colono)

        actividad.actualizar()

        const durabilidadInicial = arbol.durabilidad

        actividad.actualizar()

        expect(arbol.durabilidad).toBe(
            durabilidadInicial - colono.dañoTala
        )
    })

    it("Un colono libera su árbol objetivo cuando lo tala", () => {
        const colonia = crearColonia()
        const arbol = new Arbol({ x: 0, y: 0 })
        arbol.durabilidad = 1

        colonia.mundo.arboles.push(arbol)

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadTalarArboles(colono)

        actividad.actualizar()
        actividad.actualizar()

        expect(arbol.descartable).toBe(true)
        expect(colono.objetivo).toBeNull()
        expect(arbol.responsable).toBeNull()
    })

    it("Un árbol elegido para talar queda reservado para ese colono", () => {
        const colonia = crearColonia()

        const arbol = new Arbol({ x: 5, y: 0 })
        colonia.mundo.arboles.push(arbol)

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadTalarArboles(colono)

        actividad.actualizar()

        expect(arbol.responsable).toBe(colono)
    })

    it("Un colono no elige un árbol que ya está siendo talado por otro colono", () => {
        const colonia = crearColonia()

        const arbol1 = new Arbol({ x: 5, y: 0 })
        const arbol2 = new Arbol({ x: 10, y: 0 })

        colonia.mundo.arboles.push(arbol1, arbol2)

        const colono1 = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const colono2 = new Colono(
            "Pedro",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad1 = new ActividadTalarArboles(colono1)
        const actividad2 = new ActividadTalarArboles(colono2)

        actividad1.actualizar()
        actividad2.actualizar()

        expect(colono1.objetivo).toBe(arbol1)
        expect(colono2.objetivo).toBe(arbol2)
    })

    it("Un colono busca otro árbol después de terminar de talar uno", () => {
        const colonia = crearColonia()

        const arbol1 = new Arbol({ x: 0, y: 0 })
        arbol1.durabilidad = 1

        const arbol2 = new Arbol({ x: 5, y: 0 })

        colonia.mundo.arboles.push(arbol1, arbol2)

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadTalarArboles(colono)

        actividad.actualizar()
        expect(colono.objetivo).toBe(arbol1)

        actividad.actualizar()
        expect(colono.objetivo).toBeNull()

        actividad.actualizar()

        expect(colono.objetivo).toBe(arbol2)
    })

    it("Un colono queda sin objetivo cuando no quedan árboles disponibles", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadTalarArboles(colono)

        actividad.actualizar()

        expect(colono.objetivo).toBeNull()
    })

    it("Un colono con un árbol asignado no busca otro árbol", () => {
        const colonia = crearColonia()

        const arbol1 = new Arbol({ x: 5, y: 0 })
        const arbol2 = new Arbol({ x: 10, y: 0 })

        colonia.mundo.arboles.push(arbol1, arbol2)

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadTalarArboles(colono)

        actividad.actualizar()
        const objetivo = colono.objetivo

        actividad.actualizar()

        expect(colono.objetivo).toBe(objetivo)
    })
    it("Un colono se mueve hacia su árbol objetivo y luego lo tala", () => {
        const colonia = crearColonia()

        const arbol = new Arbol({ x: 1, y: 0 })
        colonia.mundo.arboles.push(arbol)

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadTalarArboles(colono)

        const durabilidadInicial = arbol.durabilidad

        actividad.actualizar()

        colono.actualizarMovimiento()
        actividad.actualizar()

        expect(colono.posicion).toEqual({ x: 1, y: 0 })
        expect(arbol.durabilidad).toBe(
            durabilidadInicial - colono.dañoTala
        )
    })

    it("Un colono ejecuta su actividad al actualizarse", () => {
        const colonia = crearColonia()
        const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

        let ejecutada = false

        colono.actividad = {
            actualizar() {
                ejecutada = true
            }
        }

        colono.actualizar()

        expect(ejecutada).toBe(true)
    })
})