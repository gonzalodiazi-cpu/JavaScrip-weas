import { describe, it, expect } from "vitest"
import { Inventario } from "@src/inventario/Inventario.js"
import { crearInventario } from "../helpers/crearInventario.js"
import { Almacenamiento } from "../../src/maquinas/Almacenamiento.js"

describe("Inventario", () => {
    it("Un inventario puede consultar cuánto puede guardar de un tipo", () => {
        const estadisticas = {
            cantidadSlotsInventario: 3,
            capacidadSlotsInventario: 10
        }

        const inventario = new Inventario(estadisticas)

        expect(
            inventario.consultarCantidadGuardable("Madera", 15)
        ).toBe(15)
    })

    it("Un inventario puede consultar cuánto puede sacar de un tipo", () => {
        const estadisticas = {
            cantidadSlotsInventario: 3,
            capacidadSlotsInventario: 10
        }

        const inventario = new Inventario(estadisticas)

        inventario.almacenamiento.establecerCapacidad("Madera", 30)
        inventario.almacenamiento.guardar("Madera", 15)

        expect(
            inventario.consultarCantidadSacable("Madera", 10)
        ).toBe(10)
    })

    it("Un inventario puede guardar recursos", () => {
        const estadisticas = {
            cantidadSlotsInventario: 3,
            capacidadSlotsInventario: 10
        }

        const inventario = new Inventario(estadisticas)

        inventario.guardar("Madera", 15)

        expect(
            inventario.almacenamiento.consultarCantidad("Madera")
        ).toBe(15)
    })

    it("Un inventario considera el espacio restante del mismo tipo aunque no queden slots completos", () => {
        const inventario = new Inventario({
            cantidadSlotsInventario: 3,
            capacidadSlotsInventario: 10
        })

        inventario.guardar("Madera", 15)
        inventario.guardar("Piedra", 15)

        expect(
            inventario.consultarCantidadGuardable("Madera", 10)
        ).toBe(5)
    })

    it("Al sacar recursos de un tipo, libera espacio para los demás tipos", () => {
        const estadisticas = {
            cantidadSlotsInventario: 3,
            capacidadSlotsInventario: 10
        }

        const inventario = new Inventario(estadisticas)

        inventario.guardar("Madera", 15)
        inventario.guardar("Piedra", 15)

        inventario.sacar("Madera", 15)

        expect(
            inventario.consultarCantidadGuardable("Hierro", 10)
        ).toBe(10)

        expect(
            inventario.almacenamiento.capacidades.get("Piedra")
        ).toBe(30)
    })

    it("Un inventario puede recibir una cantidad desde un almacenamiento", () => {
        const inventario = crearInventario()

        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        almacenamiento.guardar("Madera", 10)

        expect(
            inventario.puedeRecibirDesdeAlmacen(
                almacenamiento,
                "Madera",
                10
            )
        ).toBe(true)
    })
    it("Un inventario no puede recibir más de lo que el almacenamiento puede sacar", () => {
        const inventario = crearInventario()

        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        almacenamiento.guardar("Madera", 5)

        expect(
            inventario.puedeRecibirDesdeAlmacen(
                almacenamiento,
                "Madera",
                10
            )
        ).toBe(false)
    })

    it("Un inventario no puede recibir si no tiene espacio suficiente", () => {
        const inventario = new Inventario({
            cantidadSlotsInventario: 1,
            capacidadSlotsInventario: 10
        })

        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        almacenamiento.guardar("Madera", 10)
        inventario.guardar("Piedra", 10)

        expect(
            inventario.puedeRecibirDesdeAlmacen(
                almacenamiento,
                "Madera",
                10
            )
        ).toBe(false)
    })

    it("Un inventario puede entregar una cantidad a un almacenamiento", () => {
        const inventario = crearInventario()

        inventario.guardar("Madera", 10)

        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        expect(
            inventario.puedeEntregarAAlmacen(
                almacenamiento,
                "Madera",
                10
            )
        ).toBe(true)
    })

    it("Un inventario no puede entregar más de lo que puede sacar", () => {
        const inventario = crearInventario()

        inventario.guardar("Madera", 5)

        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        expect(
            inventario.puedeEntregarAAlmacen(
                almacenamiento,
                "Madera",
                10
            )
        ).toBe(false)
    })

    it("Un inventario no puede entregar si el almacenamiento no tiene espacio suficiente", () => {
        const inventario = crearInventario()
        inventario.guardar("Madera", 10)

        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        almacenamiento.guardar("Madera", 15)

        expect(
            inventario.puedeEntregarAAlmacen(
                almacenamiento,
                "Madera",
                10
            )
        ).toBe(false)
    })

    it("Un inventario puede recoger un recurso", () => {
        const inventario = crearInventario()

        const recurso = {
            tipo: "Madera",
            cantidad: 8
        }

        inventario.recogerRecurso(recurso)

        expect(
            inventario.almacenamiento.consultarCantidad("Madera")
        ).toBe(8)

        expect(recurso.cantidad).toBe(0)
    })

    it("Un inventario entrega recursos a un almacenamiento en el que pueda", () => {
        const inventario = crearInventario()
        inventario.guardar("Madera", 10)

        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        inventario.entregarAAlmacenamiento(
            almacenamiento,
            "Madera",
            10
        )

        expect(
            inventario.consultarCantidadSacable("Madera", 10)
        ).toBe(0)

        expect(
            almacenamiento.consultarCantidad("Madera")
        ).toBe(10)
    })

    it("Un inventario no puede entregar recursos a un almacenamiento sin espacio", () => {
        const inventario = crearInventario()
        inventario.guardar("Madera", 10)

        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 10]])
        )

        almacenamiento.guardar("Madera", 10)

        inventario.entregarAAlmacenamiento(
            almacenamiento,
            "Madera",
            10
        )

        expect(
            inventario.consultarCantidadSacable("Madera", 10)
        ).toBe(10)

        expect(
            almacenamiento.consultarCantidad("Madera")
        ).toBe(10)
    })

    it("Un inventario recibe recursos desde un almacenamiento si puede", () => {
        const inventario = crearInventario()

        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        almacenamiento.guardar("Madera", 10)

        inventario.recibirDesdeAlmacenamiento(
            almacenamiento,
            "Madera",
            10
        )

        expect(
            almacenamiento.consultarCantidad("Madera")
        ).toBe(0)

        expect(
            inventario.consultarCantidadSacable("Madera", 10)
        ).toBe(10)
    })

    it("Un inventario no recibe recursos si ya no puede recibirlos", () => {
        const inventario = new Inventario({
            cantidadSlotsInventario: 1,
            capacidadSlotsInventario: 10
        })

        inventario.guardar("Piedra", 10)

        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        almacenamiento.guardar("Madera", 10)

        inventario.recibirDesdeAlmacenamiento(
            almacenamiento,
            "Madera",
            10
        )

        expect(
            almacenamiento.consultarCantidad("Madera")
        ).toBe(10)
    })

    it("Un inventario entrega recursos a un almacenamiento si puede", () => {
        const inventario = crearInventario()

        inventario.guardar("Madera", 10)

        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 20]])
        )

        inventario.entregarAAlmacenamiento(
            almacenamiento,
            "Madera",
            10
        )

        expect(
            inventario.consultarCantidadSacable("Madera", 10)
        ).toBe(0)

        expect(
            almacenamiento.consultarCantidad("Madera")
        ).toBe(10)
    })

    it("Un inventario no entrega recursos si el almacenamiento ya no puede recibirlos", () => {
        const inventario = crearInventario()

        inventario.guardar("Madera", 10)

        const almacenamiento = new Almacenamiento(
            new Map([["Madera", 10]])
        )

        almacenamiento.guardar("Madera", 10)

        inventario.entregarAAlmacenamiento(
            almacenamiento,
            "Madera",
            10
        )

        expect(
            inventario.consultarCantidadSacable("Madera", 10)
        ).toBe(10)

        expect(
            almacenamiento.consultarCantidad("Madera")
        ).toBe(10)
    })
})