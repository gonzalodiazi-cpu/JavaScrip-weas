// tests/sociedad/actividades/Actividad.test.js

import { describe, it, expect } from "vitest"
import { Actividad } from "@src/sociedad/actividades/Actividad.js"
import { Colono } from "@src/sociedad/Colono.js"
import { Arbol } from "@src/mundo/Arbol.js"
import { crearColonia } from "../../helpers/crearColonia.js"
import { Almacenamiento } from "../../../src/maquinas/Almacenamiento.js"

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

    it("Una actividad puede saber si una cantidad es transferible entre dos almacenamientos", () => {
        const colonia = crearColonia()
        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new Actividad(colono)

        const origen = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        const destino = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        origen.guardar("Madera", 10)

        expect(
            actividad.esTransferible(
                origen,
                destino,
                "Madera",
                10
            )
        ).toBe(true)
    })

    it("Una actividad no considera transferible una cantidad si el origen no puede entregarla", () => {
        const colonia = crearColonia()
        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new Actividad(colono)

        const origen = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        const destino = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        origen.guardar("Madera", 5)

        expect(
            actividad.esTransferible(
                origen,
                destino,
                "Madera",
                10
            )
        ).toBe(false)
    })

    it("Una actividad puede saber si una cantidad es transportable entre dos almacenamientos", () => {
        const colonia = crearColonia()
        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new Actividad(colono)

        const origen = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        const destino = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        origen.guardar("Madera", 10)

        expect(
            actividad.esTransportable(
                origen,
                destino,
                "Madera",
                10
            )
        ).toBe(true)
    })

    it("Una actividad no considera transportable una cantidad si el inventario no puede almacenarla", () => {
        const colonia = crearColonia()

        colonia.estadisticasBaseColono.cantidadSlotsInventario = 1
        colonia.estadisticasBaseColono.capacidadSlotsInventario = 5

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new Actividad(colono)

        const origen = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        const destino = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        origen.guardar("Madera", 10)

        colono.inventario.guardar("Piedra", 5)

        expect(
            actividad.esTransportable(
                origen,
                destino,
                "Madera",
                10
            )
        ).toBe(false)
    })

    //Tests de terminarActividad
    it("Una actividad normal se termina al terminarActividad", () => {
        const colonia = crearColonia()
        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new Actividad(colono)
        colono.iniciarActividad(actividad)

        actividad.terminarActividad()

        expect(colono.actividad).toBeNull()
    })

    it("Una actividad puede iniciar una actividad secundaria", () => {
        const colonia = crearColonia()
        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividadPrincipal = new Actividad(colono)
        const actividadSecundaria = new Actividad(colono)

        colono.iniciarActividad(actividadPrincipal)

        actividadPrincipal.iniciarActividadSecundaria(
            actividadSecundaria
        )

        expect(colono.actividad).toBe(actividadSecundaria)
    })

    it("Una actividad secundaria devuelve el control a su actividad principal al terminar", () => {
        const colonia = crearColonia()
        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividadPrincipal = new Actividad(colono)
        const actividadSecundaria = new Actividad(colono)

        colono.iniciarActividad(actividadPrincipal)

        actividadPrincipal.iniciarActividadSecundaria(
            actividadSecundaria
        )

        actividadSecundaria.terminarActividad()

        expect(colono.actividad).toBe(actividadPrincipal)
    })

    it("Una actividad almacena el resultado de una actividad secundaria", () => {
        const colonia = crearColonia()
        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new Actividad(colono)

        actividad.recibirResultadoActividadSecundaria("Exito")

        expect(
            actividad.resultadosActividadesSecundarias
        ).toEqual(["Exito"])
    })

    it("Una actividad almacena los resultados de varias actividades secundarias", () => {
        const colonia = crearColonia()
        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new Actividad(colono)

        actividad.recibirResultadoActividadSecundaria("Exito")
        actividad.recibirResultadoActividadSecundaria("Fracaso")

        expect(
            actividad.resultadosActividadesSecundarias
        ).toEqual(["Exito", "Fracaso"])
    })

    it("Una actividad secundaria entrega su resultado a la actividad principal al terminar", () => {
        const colonia = crearColonia()
        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividadPrincipal = new Actividad(colono)
        const actividadSecundaria = new Actividad(colono)

        actividadSecundaria.resultado = "Exito"

        colono.iniciarActividad(actividadPrincipal)
        actividadPrincipal.iniciarActividadSecundaria(
            actividadSecundaria
        )

        actividadSecundaria.terminarActividad()

        expect(
            actividadPrincipal.resultadosActividadesSecundarias
        ).toEqual(["Exito"])
    })

    it("Una actividad puede definir cómo recibe el resultado de una actividad secundaria", () => {
        class ActividadPersonalizada extends Actividad {
            recibirResultadoActividadSecundaria(resultado) {
                this.resultadoRecibido = resultado
            }
        }

        const colonia = crearColonia()
        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadPersonalizada(colono)

        actividad.recibirResultadoActividadSecundaria("Exito")

        expect(actividad.resultadoRecibido).toBe("Exito")
    })

    it("Una actividad secundaria entrega el resultado usando el método de la actividad principal", () => {
        class ActividadPersonalizada extends Actividad {
            recibirResultadoActividadSecundaria(resultado) {
                this.resultadoRecibido = resultado
            }
        }

        const colonia = crearColonia()
        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividadPrincipal = new ActividadPersonalizada(colono)
        const actividadSecundaria = new Actividad(colono)

        actividadSecundaria.resultado = "Exito"

        colono.iniciarActividad(actividadPrincipal)
        actividadPrincipal.iniciarActividadSecundaria(
            actividadSecundaria
        )

        actividadSecundaria.terminarActividad()

        expect(
            actividadPrincipal.resultadoRecibido
        ).toBe("Exito")
    })
})