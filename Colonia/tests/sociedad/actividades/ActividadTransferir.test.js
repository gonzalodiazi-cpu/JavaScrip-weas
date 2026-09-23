import { describe, it, expect, vi } from "vitest"

import { ActividadTransferir } from "../../../src/sociedad/actividades/ActividadTransferir.js"
import { ActividadRecibirDeAlmacen } from "../../../src/sociedad/actividades/ActividadRecibirDeAlmacen.js"
import { ActividadEntregarAAlmacen } from "../../../src/sociedad/actividades/ActividadEntregarAAlmacen.js"

import { Colono } from "../../../src/sociedad/Colono.js"
import { Almacenamiento } from "../../../src/maquinas/Almacenamiento.js"

import { crearColonia } from "../../helpers/crearColonia.js"


function crearAlmacenador(posicion, capacidad = 20, cantidad = 0) {
    const almacenamiento = new Almacenamiento(
        new Map([["Madera", capacidad]])
    )

    almacenamiento.guardar("Madera", cantidad)

    return {
        posicion,
        almacenamiento
    }
}


describe("ActividadTransferir", () => {

    it("Una actividad transferir inicia una actividad recibir como secundaria", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 100, y: 0 }
        )

        const origen = crearAlmacenador(
            { x: 100, y: 0 },
            20,
            10
        )

        const destino = crearAlmacenador(
            { x: 200, y: 0 }
        )

        const actividad = new ActividadTransferir(
            colono,
            origen,
            destino,
            "Madera",
            10
        )

        colono.iniciarActividad(actividad)

        actividad.actualizar()

        expect(colono.actividad)
            .toBeInstanceOf(ActividadRecibirDeAlmacen)
    })


    it("Una actividad transferir no se actualiza mientras una actividad secundaria está activa", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const origen = crearAlmacenador(
            { x: 100, y: 0 },
            20,
            10
        )

        const destino = crearAlmacenador(
            { x: 200, y: 0 }
        )

        const actividad = new ActividadTransferir(
            colono,
            origen,
            destino,
            "Madera",
            10
        )

        const actualizar = vi.spyOn(
            actividad,
            "actualizar"
        )

        colono.iniciarActividad(actividad)

        actividad.actualizar()

        expect(colono.actividad)
            .toBeInstanceOf(ActividadRecibirDeAlmacen)

        colono.actualizar()

        expect(actualizar).toHaveBeenCalledTimes(1)
    })


    it("Una actividad transferir inicia una actividad entregar después de recibir los recursos", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 100, y: 0 }
        )

        const origen = crearAlmacenador(
            { x: 100, y: 0 },
            20,
            10
        )

        const destino = crearAlmacenador(
            { x: 200, y: 0 }
        )

        const actividad = new ActividadTransferir(
            colono,
            origen,
            destino,
            "Madera",
            10
        )

        colono.iniciarActividad(actividad)

        actividad.actualizar()

        const recibir = colono.actividad

        recibir.actualizar()

        expect(recibir.resultado)
            .toBe("Exito")

        expect(colono.actividad)
            .toBe(actividad)

        actividad.actualizar()

        expect(colono.actividad)
            .toBeInstanceOf(ActividadEntregarAAlmacen)
    })


    it("Una actividad transferir no se actualiza mientras entrega los recursos", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 100, y: 0 }
        )

        const origen = crearAlmacenador(
            { x: 100, y: 0 },
            20,
            10
        )

        const destino = crearAlmacenador(
            { x: 200, y: 0 }
        )

        const actividad = new ActividadTransferir(
            colono,
            origen,
            destino,
            "Madera",
            10
        )

        colono.iniciarActividad(actividad)

        actividad.actualizar()

        const recibir = colono.actividad
        recibir.actualizar()

        actividad.actualizar()

        expect(colono.actividad)
            .toBeInstanceOf(ActividadEntregarAAlmacen)

        const entregar = colono.actividad

        const actualizar = vi.spyOn(
            actividad,
            "actualizar"
        )

        entregar.actualizar()

        expect(actualizar).not.toHaveBeenCalled()
    })


    it("Una actividad transferir termina exitosamente después de entregar los recursos", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 100, y: 0 }
        )

        const origen = crearAlmacenador(
            { x: 100, y: 0 },
            20,
            10
        )

        const destino = crearAlmacenador(
            { x: 200, y: 0 }
        )

        const actividad = new ActividadTransferir(
            colono,
            origen,
            destino,
            "Madera",
            10
        )

        colono.iniciarActividad(actividad)

        actividad.actualizar()

        const recibir = colono.actividad
        recibir.actualizar()

        actividad.actualizar()

        const entregar = colono.actividad

        colono.posicion = destino.posicion

        entregar.actualizar()

        expect(entregar.resultado)
            .toBe("Exito")

        expect(actividad.resultado)
            .toBe(null)

        expect(colono.actividad)
            .toBe(actividad)

        actividad.actualizar()

        expect(actividad.resultado)
            .toBe("Exito")

        expect(colono.actividad)
            .toBeNull()
    })


    it("Una actividad transferir termina si la recepción secundaria fracasa", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 100, y: 0 }
        )

        const origen = crearAlmacenador(
            { x: 100, y: 0 },
            20,
            10
        )

        const destino = crearAlmacenador(
            { x: 200, y: 0 }
        )

        const actividad = new ActividadTransferir(
            colono,
            origen,
            destino,
            "Madera",
            10
        )

        colono.iniciarActividad(actividad)

        actividad.actualizar()

        const recibir = colono.actividad

        recibir.resultado = "Fracaso"
        recibir.terminarActividad()

        expect(colono.actividad)
            .toBe(actividad)

        actividad.actualizar()

        expect(actividad.resultado)
            .toBe("Fracaso")

        expect(colono.actividad)
            .toBeNull()
    })


    it("Una actividad transferir termina si la entrega secundaria fracasa", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 100, y: 0 }
        )

        const origen = crearAlmacenador(
            { x: 100, y: 0 },
            20,
            10
        )

        const destino = crearAlmacenador(
            { x: 200, y: 0 }
        )

        const actividad = new ActividadTransferir(
            colono,
            origen,
            destino,
            "Madera",
            10
        )

        colono.iniciarActividad(actividad)

        actividad.actualizar()

        const recibir = colono.actividad
        recibir.resultado = "Exito"
        recibir.terminarActividad()

        actividad.actualizar()

        const entregar = colono.actividad

        entregar.resultado = "Fracaso"
        entregar.terminarActividad()

        expect(colono.actividad)
            .toBe(actividad)

        actividad.actualizar()

        expect(actividad.resultado)
            .toBe("Fracaso")

        expect(colono.actividad)
            .toBeNull()
    })
})