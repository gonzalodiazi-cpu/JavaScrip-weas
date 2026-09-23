import { describe, it, expect } from "vitest"
import { ActividadReponer } from "../../../src/sociedad/actividades/ActividadReponer"
import { ActividadTransferir } from "@src/sociedad/actividades/ActividadTransferir.js"
import { ActividadEntregarAAlmacen } from "@src/sociedad/actividades/ActividadEntregarAAlmacen.js"
import { Colono } from "@src/sociedad/Colono.js"
import { Mundo } from "@src/mundo/Mundo.js"
import { Colonia } from "@src/sociedad/Colonia.js"
import { Almacenamiento } from "../../../src/maquinas/Almacenamiento"
import { crearColonia } from "../../helpers/crearColonia"

describe("ActividadReponer", () => {

    it("Entrega los recursos que ya tiene el colono", () => {
        const mundo = new Mundo(1000, 1000)
        const colonia = new Colonia(mundo)

        const colono = new Colono(
            "Juan",
            colonia,
            {x: 0, y: 0}
        )

        const destino = {
            posicion: {x: 100, y: 0},
            almacenamiento:
                new Almacenamiento(
                    [["madera", 10]]
                )
        }

        colono.inventario.guardar("madera", 10)

        const actividad =
            new ActividadReponer(
                colono,
                destino,
                "madera",
                10
            )

        colono.iniciarActividad(actividad)

        expect(actividad).toBeInstanceOf(ActividadReponer)

        expect(colono.actividad).toBe(actividad)
    })

    it("Crea una transferencia por la cantidad que falta", () => {
        const mundo = new Mundo(1000, 1000)
        const colonia = new Colonia(mundo)

        const colono = new Colono(
            "Juan",
            colonia,
            {x: 0, y: 0}
        )

        const destino = {
            posicion: {x: 100, y: 0},
            almacenamiento:
                new Almacenamiento(
                    [["madera", 10]]
                )
        }

        colono.inventario.guardar("madera", 4)

        const actividad =
            new ActividadReponer(
                colono,
                destino,
                "madera",
                10
            )

        colono.iniciarActividad(actividad)
        actividad.actualizar()

        expect(colono.actividad)
            .toBeInstanceOf(ActividadTransferir)

        expect(colono.actividad.cantidad)
            .toBe(6)
    })

    it("No crea una transferencia si ya tiene toda la cantidad", () => {
        const mundo = new Mundo(1000, 1000)
        const colonia = new Colonia(mundo)

        const colono = new Colono(
            "Juan",
            colonia,
            {x: 0, y: 0}
        )

        const destino = {
            posicion: {x: 100, y: 0},
            almacenamiento:
                new Almacenamiento(
                    [["madera", 10]]
                )
        }

        colono.inventario.guardar("madera", 10)

        const actividad =
            new ActividadReponer(
                colono,
                destino,
                "madera",
                10
            )

        colono.iniciarActividad(actividad)
        actividad.actualizar()

        expect(colono.actividad)
            .toBeInstanceOf(ActividadEntregarAAlmacen)
    })

    it("Una actividad reponer termina si la transferencia fracasa", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            {x: 0, y: 0}
        )

        const destino = {
            posicion: {x: 100, y: 0},
            almacenamiento:
                new Almacenamiento(
                    [["madera", 10]]
                )
        }

        colono.inventario.guardar("madera", 4)

        const actividad =
            new ActividadReponer(
                colono,
                destino,
                "madera",
                10
            )

        colono.iniciarActividad(actividad)

        actividad.actualizar()

        expect(colono.actividad)
            .toBeInstanceOf(ActividadTransferir)

        colono.actividad.resultado = "Fracaso"
        colono.actividad.terminarActividad()

        expect(actividad.resultado)
            .toBe("Fracaso")

        expect(colono.actividad)
            .toBeNull()
    })

    it("Una actividad reponer fracasa si no puede obtener la cantidad faltante", () => {
        const colonia = crearColonia()

        colonia.ayuntamiento.recibirMadera(2)

        const colono = new Colono(
            "Juan",
            colonia,
            colonia.ayuntamiento.posicion
        )

        const destino = {
            posicion: {x: 100, y: 0},
            almacenamiento:
                new Almacenamiento(
                    [["madera", 10]]
                )
        }

        colono.inventario.guardar("madera", 4)

        const actividad =
            new ActividadReponer(
                colono,
                destino,
                "madera",
                10
            )

        colono.iniciarActividad(actividad)

        // Reponer inicia Transferir por las 6 que faltan.
        actividad.actualizar()

        expect(colono.actividad)
            .toBeInstanceOf(ActividadTransferir)

        // Transferir inicia Recibir.
        colono.actividad.actualizar()

        // Recibir intenta obtener 6, pero el Ayuntamiento solo tiene 2.
        colono.actividad.actualizar()

        // Transferir recibe el fracaso y termina.
        colono.actividad.actualizar()

        expect(actividad.resultado)
            .toBe("Fracaso")

        expect(colono.actividad)
            .toBeNull()
    })
})