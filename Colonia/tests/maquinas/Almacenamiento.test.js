import { describe, it, expect } from "vitest"
import { Almacenamiento } from "@src/maquinas/Almacenamiento.js"

describe("Almacenamiento", () => {
    it("Comienza vacío y conoce sus capacidades", () => {
        const almacenamiento = new Almacenamiento(
            new Map([
                ["Madera", 20]
            ])
        )

        expect(almacenamiento.recursos.size).toBe(0)
        expect(almacenamiento.capacidades.get("Madera")).toBe(20)
    })

    //Tests de consultarCantidadGuardable

    it("Consulta la cantidad guardable cuando hay espacio suficiente", () => {
        const almacenamiento = new Almacenamiento(
            new Map([
                ["Madera", 20]
            ])
        )

        expect(
            almacenamiento.consultarCantidadGuardable("Madera", 10)
        ).toBe(10)
    })

    it("Consulta la cantidad guardable considerando lo que ya está almacenado", () => {
        const almacenamiento = new Almacenamiento(
            new Map([
                ["Madera", 20]
            ])
        )

        almacenamiento.guardar("Madera", 15)

        expect(
            almacenamiento.consultarCantidadGuardable("Madera", 10)
        ).toBe(5)
    })

    it("No puede guardar un tipo de recurso que no acepta", () => {
        const almacenamiento = new Almacenamiento(
            new Map([
                ["Madera", 20]
            ])
        )

        expect(
            almacenamiento.consultarCantidadGuardable("Piedra", 5)
        ).toBe(0)
    })

    it("Devuelve 0 si la cantidad solicitada es negativa", () => {
        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        expect(
            almacenamiento.consultarCantidadGuardable("Madera", -5)
        ).toBe(0)
    })

    //Tests de consultarCantidadSacable
    it("Consulta la cantidad que puede sacar de un recurso", () => {
        const almacenamiento = new Almacenamiento(
            new Map([
                ["Madera", 20]
            ])
        )

        almacenamiento.guardar("Madera", 15)

        expect(
            almacenamiento.consultarCantidadSacable("Madera", 10)
        ).toBe(10)
    })

    it("No puede sacar más de lo que tiene almacenado", () => {
        const almacenamiento = new Almacenamiento(
            new Map([
                ["Madera", 20]
            ])
        )

        almacenamiento.guardar("Madera", 10)

        expect(
            almacenamiento.consultarCantidadSacable("Madera", 15)
        ).toBe(0)
    })

    it("Devuelve 0 si la cantidad solicitada es negativa", () => {
        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        almacenamiento.guardar("Madera", 10)

        expect(
            almacenamiento.consultarCantidadSacable("Madera", -5)
        ).toBe(0)
    })

    //Tests de guardar


    it("Puede guardar un recurso", () => {
        const almacenamiento = new Almacenamiento(
            new Map([
                ["Madera", 20]
            ])
        )

        almacenamiento.guardar("Madera", 5)

        expect(almacenamiento.recursos.get("Madera")).toBe(5)
    })

    it("No puede guardar más recursos que lo que su capacidad permite", () => {
        const almacenamiento = new Almacenamiento(
            new Map([
                ["Madera", 20]
            ])
        )

        almacenamiento.guardar("Madera", 25)

        expect(almacenamiento.recursos.get("Madera")).toBe(20)
    })

    it("No guarda cantidades negativas", () => {
        const almacenamiento = new Almacenamiento(
            new Map([
                ["Madera", 20]
            ])
        )

        almacenamiento.guardar("Madera", -5)

        expect(almacenamiento.recursos.size).toBe(0)
    })
    //Tests de sacar

    it("Puede sacar una cantidad de un recurso", () => {
        const almacenamiento = new Almacenamiento(
            new Map([
                ["Madera", 20]
            ])
        )

        almacenamiento.guardar("Madera", 15)

        almacenamiento.sacar("Madera", 10)

        expect(almacenamiento.recursos.get("Madera")).toBe(5)
    })

    it("Al sacar todo un recurso, elimina su tipo del almacenamiento", () => {
        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        almacenamiento.guardar("Madera", 15)
        almacenamiento.sacar("Madera", 15)

        expect(almacenamiento.recursos.has("Madera")).toBe(false)
    })

    //Tests de tiene
    it("Puede consultar si tiene una cantidad suficiente de un recurso", () => {
        const almacenamiento = new Almacenamiento(
            new Map([
                ["Madera", 20]
            ])
        )

        almacenamiento.guardar("Madera", 15)

        expect(almacenamiento.tiene("Madera", 10)).toBe(true)
    })

    it("Devuelve falso si no tiene suficiente cantidad de un recurso", () => {
        const almacenamiento = new Almacenamiento(
            new Map([
                ["Madera", 20]
            ])
        )

        almacenamiento.guardar("Madera", 5)

        expect(almacenamiento.tiene("Madera", 10)).toBe(false)
    })
    //Tests de refactor inventario

    it("Un almacenamiento puede permitir crear nuevos tipos", () => {
        const almacenamiento = new Almacenamiento(new Map(), 1, true)

        almacenamiento.establecerCapacidad("Madera", 50)

        expect(almacenamiento.capacidades.get("Madera")).toBe(50)
    })

    it("Un almacenamiento normal no puede crear un tipo nuevo", () => {
        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        almacenamiento.establecerCapacidad("Piedra", 50)

        expect(almacenamiento.capacidades.has("Piedra")).toBe(false)
    })

    it("Permite consultar la cantidad almacenada de un tipo", () => {
        const almacenamiento = new Almacenamiento(
            new Map([
                ["Madera", 20]
            ])
        )

        almacenamiento.guardar("Madera", 15)

        expect(
            almacenamiento.consultarCantidad("Madera")
        ).toBe(15)
    })

    it("Permite consultar los tipos de recursos almacenados", () => {
        const almacenamiento = new Almacenamiento(
            new Map([
                ["Madera", 20],
                ["Piedra", 10]
            ])
        )

        almacenamiento.guardar("Madera", 5)
        almacenamiento.guardar("Piedra", 3)

        expect(almacenamiento.consultarTipos()).toEqual([
            "Madera",
            "Piedra"
        ])
    })

    
})