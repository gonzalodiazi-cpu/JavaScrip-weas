import { describe, it, expect } from "vitest"
import { MaquinaProcesadora } from "@src/maquinas/MaquinaProcesadora.js"
import { Receta } from "@src/maquinas/Receta.js"

class MaquinaDePrueba extends MaquinaProcesadora {
    constructor() {
        const receta = new Receta(
            new Map([
                ["Madera", 10]
            ]),
            new Map([
                ["Tablas", 5]
            ])
        )

        super(receta)
    }
}

describe("MaquinaProcesadora", () => {
    it("Comienza apagada con su receta y sus almacenamientos", () => {
        const maquina = new MaquinaDePrueba()

        expect(maquina.estado).toBe("Apagada")

        expect(maquina.receta.entradas.get("Madera")).toBe(10)
        expect(maquina.receta.salidas.get("Tablas")).toBe(5)

        expect(maquina.almacenamientoEntrada.capacidades.get("Madera")).toBe(50)
        expect(maquina.almacenamientoSalida.capacidades.get("Tablas")).toBe(25)
    })

    it("Puede recibir recursos en su almacenamiento de entrada", () => {
        const maquina = new MaquinaDePrueba()

        maquina.recibir("Madera", 5)

        expect(
            maquina.almacenamientoEntrada.recursos.get("Madera")
        ).toBe(5)
    })

    it("Puede consultar si tiene los recursos necesarios para procesar", () => {
        const maquina = new MaquinaDePrueba()

        maquina.recibir("Madera", 10)

        expect(maquina.tieneRecursosNecesarios()).toBe(true)
    })

    it("Puede consultar si tiene espacio para procesar", () => {
        const maquina = new MaquinaDePrueba()

        expect(maquina.tieneEspacioParaProcesar()).toBe(true)
    })
    
    it("Se enciende cuando tiene los recursos necesarios y espacio para los productos", () => {
        const maquina = new MaquinaDePrueba()

        maquina.recibir("Madera", 10)

        maquina.encender()

        expect(maquina.estado).toBe("Encendida")
    })
    it("No se enciende si no tiene los recursos necesarios", () => {
        const maquina = new MaquinaDePrueba()

        maquina.encender()

        expect(maquina.estado).toBe("Apagada")
    })
    it("No se enciende si no tiene espacio para procesar", () => {
        const maquina = new MaquinaDePrueba()

        maquina.recibir("Madera", 10)
        maquina.almacenamientoSalida.guardar("Tablas", 21)

        maquina.encender()

        expect(maquina.estado).toBe("Apagada")
    })

    it("Al encenderse consume los recursos necesarios", () => {
        const maquina = new MaquinaDePrueba()

        maquina.recibir("Madera", 10)

        maquina.encender()

        expect(maquina.almacenamientoEntrada.tiene("Madera", 10)).toBe(false)
    })

    //Tests de actualizar

    it("Acumula el tiempo mientras está encendida", () => {
        const maquina = new MaquinaDePrueba()

        maquina.recibir("Madera", 10)
        maquina.encender()

        maquina.actualizar(2)

        expect(maquina.tiempoProcesando).toBe(2)
    })

    it("No acumula tiempo mientras está apagada", () => {
        const maquina = new MaquinaDePrueba()

        maquina.actualizar(2)

        expect(maquina.tiempoProcesando).toBe(0)
    })

    it("Termina de procesar al alcanzar el tiempo necesario", () => {
        const maquina = new MaquinaDePrueba()

        maquina.recibir("Madera", 10)
        maquina.encender()

        maquina.actualizar(5)

        expect(maquina.estado).toBe("Apagada")
    })

    it("No termina de procesar antes de alcanzar el tiempo necesario", () => {
        const maquina = new MaquinaDePrueba()

        maquina.recibir("Madera", 10)
        maquina.encender()

        maquina.actualizar(4)

        expect(maquina.estado).toBe("Encendida")
    })

    it("Guarda los productos al terminar de procesar", () => {
        const maquina = new MaquinaDePrueba()

        maquina.recibir("Madera", 10)
        maquina.encender()

        maquina.actualizar(5)

        expect(
            maquina.almacenamientoSalida.recursos.get("Tablas")
        ).toBe(5)
    })

    it("Reinicia el tiempo de procesamiento al terminar", () => {
        const maquina = new MaquinaDePrueba()

        maquina.recibir("Madera", 10)
        maquina.encender()

        maquina.actualizar(5)

        expect(maquina.tiempoProcesando).toBe(0)
    })
    it("No produce los productos antes de terminar de procesar", () => {
        const maquina = new MaquinaDePrueba()

        maquina.recibir("Madera", 10)
        maquina.encender()

        maquina.actualizar(4)

        expect(
            maquina.almacenamientoSalida.recursos.has("Tablas")
        ).toBe(false)
    })
})