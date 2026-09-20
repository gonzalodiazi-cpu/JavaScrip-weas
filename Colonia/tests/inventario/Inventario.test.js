import { describe, it, expect } from "vitest"
import { Inventario } from "@src/inventario/Inventario.js"
import { Recurso } from "../../src/mundo/Recurso"
import { crearInventario } from "../helpers/crearInventario"

describe("Inventario", () => {
    it("Un inventario comienza vacío y sus recursos se representan como un map", () => {
        const estadisticas = {}
        const inventario = new Inventario(estadisticas)

        expect(inventario.recursos).toBeInstanceOf(Map)
        expect(inventario.recursos.size).toBe(0)
    })
    it("Un inventario puede agregar un recurso que cabe completamente", () => {
        const inventario = crearInventario()

        const recurso = new Recurso("Madera", 7, {x:0,y:0})

        inventario.agregar(recurso)

        expect(inventario.recursos.get("Madera")).toBe(7)
    })
    it("Un inventario acumula recursos del mismo tipo", () => {
        const inventario = crearInventario()

        const recurso = new Recurso("Madera", 7, {x:0,y:0})
        const recurso2 = new Recurso("Madera", 8, {x:0, y:10})

        inventario.agregar(recurso)
        inventario.agregar(recurso2)

        expect(inventario.recursos.get("Madera")).toBe(15)
    })
    it("Un inventario puede agregar una cantidad específica de un recurso", () => {
        const inventario = crearInventario()
        
        const recurso = new Recurso("Piedra", 8, {x:0,y:0})

        inventario.agregar(recurso, 5)
        
        expect(inventario.recursos.get("Piedra")).toBe(5)
    })
    it("Al agregar una cantidad de un recurso, se descuenta esa cantidad del recurso", () => {
        const inventario = crearInventario()
        const recurso = new Recurso("Piedra", 8, {x:0,y:0})

        inventario.agregar(recurso, 5)

        expect(recurso.cantidad).toBe(3)
    })
    
    it("Al consultar cantidad agregable de un recurso que cabe completamente en el inventario, se obtiene la cantidad del recurso actual", () => {
        const inventario = crearInventario()
        const recurso = new Recurso("Madera", 8, {x:0,y:0})

        expect(inventario.consultarCantidadAgregable(recurso, 8)).toBe(8)

    })
    it("Al solicitar una cantidad mayor a la disponible en el recurso, la cantidad agregable será la cantidad actual del recurso", () => {
        const inventario = crearInventario()
        const recurso = new Recurso("Madera", 7, {x:0,y:0})

        expect(inventario.consultarCantidadAgregable(recurso, 8)).toBe(7)
    })

    it("Al consultar cantidad agregable de un recurso con espacio ocupado, se obtiene la cantidad que queda disponible", () => {
        const inventario = crearInventario()
        const recurso = new Recurso("Madera", 33, {x:0,y:0})

        inventario.agregar(recurso)

        const nuevoRecurso = new Recurso("Madera", 33, {x:10,y:0})

        expect(inventario.consultarCantidadAgregable(nuevoRecurso, 33)).toBe(17)
    })

    it("Al consultar un recurso de distinto tipo al que ya está en el inventario, se considera el espacio ocupado", () => {
        const inventario = crearInventario()

        const madera = new Recurso("Madera", 33, {x:0,y:0})
        inventario.agregar(madera)

        const piedra = new Recurso("Piedra", 33, {x:10,y:0})

        expect(inventario.consultarCantidadAgregable(piedra, 33)).toBe(10)
    })

    it("Al consultar cantidadAgregable de un tercer recurso de distinto tipo, se considera el espacio ocupado por los recursos existentes", () => {
        const inventario = crearInventario()

        const madera = new Recurso("Madera", 23, {x:0,y:0})
        const piedra = new Recurso("Piedra", 4, {x:10,y:0})

        inventario.agregar(madera)
        inventario.agregar(piedra)

        const hierro = new Recurso("Hierro", 33, {x:20,y:0})

        expect(inventario.consultarCantidadAgregable(hierro, 33)).toBe(10)
    })
    it("Un inventario puede sacar una cantidad específica de un recurso", () => {
        const inventario = crearInventario()

        const madera = new Recurso("Madera", 10, {x:0,y:0})
        inventario.agregar(madera)

        inventario.sacar("Madera", 4)

        expect(inventario.recursos.get("Madera")).toBe(6)
    })
    it("Si se pide sacar mas de la cantidad almacenada actual de un recurso del inventario, se elimina ese recurso del inventario", () => {
        const inventario = crearInventario()
        const madera = new Recurso("Madera", 8, {x:0,y:0})

        inventario.agregar(madera)
        inventario.sacar("Madera", 10)

        expect(inventario.recursos.has("Madera")).toBe(false)
    })
    it("Al sacar una cantidad negativa o igual a cero, el inventario no cambia", () => {
        const inventario = crearInventario()

        const madera = new Recurso("Madera", 8, {x:0,y:0})
        inventario.agregar(madera)

        inventario.sacar("Madera", 0)

        expect(inventario.recursos.get("Madera")).toBe(8)

        inventario.sacar("Madera", -2)

        expect(inventario.recursos.get("Madera")).toBe(8)
    })
    it("Al sacar de un recurso que no existe en el inventario, el inventario no cambia", () => {
        const inventario = crearInventario()

        inventario.sacar("Madera", 5)

        expect(inventario.recursos.size).toBe(0)
    })
    it("Al sacar todo un tipo de recurso, se elimina toda la cantidad de ese tipo", () => {
        const inventario = crearInventario()

        const madera = new Recurso("Madera", 8, {x:0,y:0})
        inventario.agregar(madera)

        inventario.sacarTipo("Madera")

        expect(inventario.recursos.has("Madera")).toBe(false)
    })
    it("Al sacar todo un tipo de recurso que no existe, el inventario no cambia", () => {
        const inventario = crearInventario()

        inventario.sacarTipo("Madera")

        expect(inventario.recursos.size).toBe(0)
    })
    it("Al vaciar un inventario, se eliminan todos sus recursos", () => {
        const inventario = crearInventario()

        const madera = new Recurso("Madera", 8, {x:0,y:0})
        const piedra = new Recurso("Piedra", 5, {x:10,y:0})

        inventario.agregar(madera)
        inventario.agregar(piedra)

        inventario.vaciar()

        expect(inventario.recursos.size).toBe(0)
    })
    it("Al vaciar un inventario vacío, el inventario sigue vacío", () => {
        const inventario = crearInventario()

        inventario.vaciar()

        expect(inventario.recursos.size).toBe(0)
    })
    it("Un inventario permite consultar si tiene una cantidad de un tipo de recurso", () => {
        const inventario = crearInventario()

        const madera = new Recurso("Madera", 8, {x:0,y:0})
        inventario.agregar(madera)

        expect(inventario.consultarTiene("Madera", 5)).toBe(true)
    })
    it("Un inventario devuelve falso si no tiene suficiente cantidad de un recurso", () => {
        const inventario = crearInventario()

        const madera = new Recurso("Madera", 8, {x:0,y:0})
        inventario.agregar(madera)

        expect(inventario.consultarTiene("Madera", 9)).toBe(false)
    })
})