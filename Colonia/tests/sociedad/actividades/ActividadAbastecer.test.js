import { describe, it, expect } from "vitest"
import { ActividadAbastecer } from "@src/sociedad/actividades/ActividadAbastecer.js"
import { Colono } from "@src/sociedad/Colono.js"
import { Sierra } from "@src/maquinas/Sierra.js"
import { crearColonia } from "../../helpers/crearColonia.js"
import { ActividadTransferir } from "../../../src/sociedad/actividades/ActividadTransferir.js"
import { MaquinaProcesadora } from "../../../src/maquinas/MaquinaProcesadora.js"
import { Almacenamiento } from "../../../src/maquinas/Almacenamiento.js"
import { Receta } from "../../../src/maquinas/Receta.js"
import { ActividadReponer } from "../../../src/sociedad/actividades/ActividadReponer.js"

class MaquinaDePrueba extends MaquinaProcesadora {
    constructor() {
        super(
            new Receta(
                new Map([
                    ["Madera", 10],
                    ["Piedra", 5]
                ]),
                new Map([
                    ["Tablas", 5]
                ])
            )
        )
    }
}


describe("ActividadAbastecer", () => {

    it("Un colono puede preparar una máquina que recibe explícitamente", () => {
        const colonia = crearColonia()

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const maquina = new Sierra(colonia)

        const actividad = new ActividadAbastecer(
            colono,
            maquina
        )

        expect(actividad.maquina).toBe(maquina)
    })


    it("Un colono busca una máquina disponible si no recibe una", () => {
        const colonia = crearColonia()

        const maquina = new Sierra({ x: 100, y: 0 })
        colonia.agregarMaquina(maquina)

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadAbastecer(colono)

        actividad.actualizar()

        expect(actividad.maquina).toBe(maquina)
    })


    it("Un colono no elige una máquina que ya está reservada", () => {
        const colonia = crearColonia()

        const maquina = new Sierra()
        maquina.asignarResponsable({})

        colonia.agregarMaquina(maquina)

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadAbastecer(colono)

        actividad.actualizar()

        expect(actividad.maquina).toBeNull()
    })


    it("Un colono calcula la cantidad necesaria para llenar una entrada de la máquina", () => {
        const colonia = crearColonia()

        const maquina = new Sierra({ x: 100, y: 0 })

        maquina.almacenamientoEntrada.establecerCapacidad(
            "Madera",
            50
        )

        maquina.almacenamientoEntrada.guardar(
            "Madera",
            5
        )

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadAbastecer(
            colono,
            maquina
        )

        expect(
            actividad.consultarCantidadNecesaria(
                maquina.almacenamientoEntrada,
                "Madera"
            )
        ).toBe(45)
    })


    it("Una actividad abastecer busca un tipo de recurso pendiente según la receta", () => {
        const colonia = crearColonia()

        const maquina = new MaquinaDePrueba()

        maquina.almacenamientoEntrada.establecerCapacidad(
            "Madera",
            10
        )

        maquina.almacenamientoEntrada.establecerCapacidad(
            "Piedra",
            5
        )

        maquina.almacenamientoEntrada.guardar(
            "Madera",
            10
        )

        const colono = new Colono(
            "Juan",
            colonia,
            { x: 0, y: 0 }
        )

        const actividad = new ActividadAbastecer(
            colono,
            maquina
        )

        expect(
            actividad._buscarTipoPendiente()
        ).toEqual({
            tipo: "Piedra",
            cantidad: 5
        })
    })


    it("Una actividad abastecer inicia una transferencia secundaria para llenar una entrada", () => {
        const colonia = crearColonia()

        colonia.ayuntamiento.recibirMadera(50)

        const maquina = new Sierra({ x: 100, y: 0 })

        const colono = new Colono(
            "Juan",
            colonia,
            colonia.ayuntamiento.posicion
        )

        const actividad = new ActividadAbastecer(
            colono,
            maquina
        )

        colono.iniciarActividad(actividad)

        actividad.actualizar()

        expect(colono.actividad).toBeInstanceOf(
            ActividadReponer
        )
    })


    it("Una actividad abastecer continúa con el siguiente tipo después de terminar una transferencia", () => {
        const colonia = crearColonia()

        colonia.ayuntamiento.almacenamiento =
            new Almacenamiento(
                new Map([
                    ["Madera", Infinity],
                    ["Piedra", Infinity]
                ])
            )

        colonia.ayuntamiento.almacenamiento.guardar(
            "Madera",
            10
        )

        colonia.ayuntamiento.almacenamiento.guardar(
            "Piedra",
            5
        )

        const maquina = new MaquinaDePrueba()

        maquina.posicion = { x: 100, y: 0 }

        maquina.almacenamientoEntrada.establecerCapacidad(
            "Madera",
            10
        )

        maquina.almacenamientoEntrada.establecerCapacidad(
            "Piedra",
            5
        )

        const colono = new Colono(
            "Juan",
            colonia,
            colonia.ayuntamiento.posicion
        )

        const actividad = new ActividadAbastecer(
            colono,
            maquina
        )

        colono.iniciarActividad(actividad)

        // Abastecer inicia la primera reposición.
        actividad.actualizar()

        expect(colono.actividad).toBeInstanceOf(
            ActividadReponer
        )

        expect(colono.actividad.tipo).toBe("Madera")
        expect(colono.actividad.cantidad).toBe(10)

        // Reponer inicia Transferir.
        colono.actividad.actualizar()

        // Transferir inicia Recibir.
        colono.actividad.actualizar()

        // Recibir recibe y termina.
        colono.actividad.actualizar()

        // Transferir recibe el resultado y crea Entregar.
        colono.actividad.actualizar()

        // Llegamos a la máquina.
        colono.posicion = maquina.posicion

        // Entregar entrega al colono.
        colono.actividad.actualizar()

        // Transferir recibe el resultado y termina.
        // Esto también hace que Reponer termine.
        colono.actividad.actualizar()

        // Volvemos a Abastecer.
        expect(colono.actividad).toBe(actividad)

        // Abastecer inicia la reposición del siguiente tipo.
        actividad.actualizar()

        expect(colono.actividad).toBeInstanceOf(
            ActividadReponer
        )

        expect(colono.actividad.tipo).toBe("Piedra")
        expect(colono.actividad.cantidad).toBe(5)
    })


    it("Una actividad abastecer termina cuando todas las entradas están llenas", () => {
        const colonia = crearColonia()

        const maquina = new MaquinaDePrueba()

        maquina.almacenamientoEntrada.establecerCapacidad(
            "Madera",
            10
        )

        maquina.almacenamientoEntrada.establecerCapacidad(
            "Piedra",
            5
        )

        maquina.almacenamientoEntrada.guardar(
            "Madera",
            10
        )

        maquina.almacenamientoEntrada.guardar(
            "Piedra",
            5
        )

        const colono = new Colono(
            "Juan",
            colonia,
            colonia.ayuntamiento.posicion
        )

        const actividad = new ActividadAbastecer(
            colono,
            maquina
        )

        colono.iniciarActividad(actividad)

        actividad.actualizar()

        expect(colono.actividad).toBeNull()
    })


    it("Una actividad abastecer termina si no puede transportar un tipo pendiente", () => {
        const colonia = crearColonia()

        const maquina = new MaquinaDePrueba()

        maquina.almacenamientoEntrada.establecerCapacidad(
            "Madera",
            10
        )

        maquina.almacenamientoEntrada.establecerCapacidad(
            "Piedra",
            5
        )

        const colono = new Colono(
            "Juan",
            colonia,
            colonia.ayuntamiento.posicion
        )

        const actividad = new ActividadAbastecer(
            colono,
            maquina
        )

        colono.iniciarActividad(actividad)

        // Abastecer inicia Transferir.
        actividad.actualizar()

        // Transferir inicia Recibir.
        colono.actividad.actualizar()

        // Recibir intenta recibir y fracasa.
        colono.actividad.actualizar()

        // Transferir recibe el fracaso y termina.
        colono.actividad.actualizar()

        // Abastecer recibe el fracaso y termina.
        colono.actividad.actualizar()

        expect(colono.actividad).toBeNull()
    })

})