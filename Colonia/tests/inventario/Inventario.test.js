import { describe, it, expect } from "vitest"
import { Inventario } from "@src/inventario/Inventario.js"
import { Recurso } from "../../src/mundo/Recurso"
import { crearInventario } from "../helpers/crearInventario"
import { Almacenamiento } from "../../src/maquinas/Almacenamiento.js"

describe("Inventario", () => {
    it("Un inventario puede agregar un recurso que cabe completamente", () => {
        const inventario = crearInventario()

        const recurso = new Recurso("Madera", 7, {x:0,y:0})

        inventario.agregar(recurso)

        expect(inventario.consultarCantidad("Madera")).toBe(7)
    })
    it("Un inventario acumula recursos del mismo tipo", () => {
        const inventario = crearInventario()

        const recurso = new Recurso("Madera", 7, {x:0,y:0})
        const recurso2 = new Recurso("Madera", 8, {x:0, y:10})

        inventario.agregar(recurso)
        inventario.agregar(recurso2)

        expect(inventario.consultarCantidad("Madera")).toBe(15)
    })
    it("Un inventario puede agregar una cantidad específica de un recurso", () => {
        const inventario = crearInventario()
        
        const recurso = new Recurso("Piedra", 8, {x:0,y:0})

        inventario.agregar(recurso, 5)
        
        expect(inventario.consultarCantidad("Piedra")).toBe(5)
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



    //Refactor Almacenamiento
    it("Un inventario tiene un almacenamiento", () => {
        const inventario = crearInventario()

        expect(inventario.almacenamiento).toBeInstanceOf(Almacenamiento)
    })

    it("Un inventario puede guardar una cantidad por tipo según sus slots", () => {
        const inventario = crearInventario()

        inventario.guardarTipo("Madera", 8)

        expect(
            inventario.almacenamiento.capacidades.get("Madera")
        ).toBe(50)

        expect(
            inventario.consultarCantidad("Madera")
        ).toBe(8)
    })

    it("Al guardar otro tipo, reduce la capacidad de los tipos existentes según los slots ocupados", () => {
        const inventario = crearInventario()

        inventario.guardarTipo("Madera", 15)
        inventario.guardarTipo("Piedra", 15)

        expect(
            inventario.almacenamiento.capacidades.get("Madera")
        ).toBe(30)

        expect(
            inventario.almacenamiento.capacidades.get("Piedra")
        ).toBe(30)
    })
    it("Al guardar más cantidad del mismo tipo puede ocupar los slots restantes", () => {
        const inventario = crearInventario()

        inventario.guardarTipo("Madera", 15)
        inventario.guardarTipo("Madera", 20)

        expect(
            inventario.consultarCantidad("Madera")
        ).toBe(35)
    })

    it("Un inventario puede sacar una cantidad de un tipo", () => {
        const inventario = crearInventario()

        inventario.guardarTipo("Madera", 20)
        inventario.sacar("Madera", 5)

        expect(
            inventario.consultarCantidad("Madera")
        ).toBe(15)
    })

    it("Al sacar recursos, libera capacidad para los otros tipos según los slots", () => {
        const inventario = crearInventario()

        inventario.guardarTipo("Madera", 15)
        inventario.guardarTipo("Piedra", 15)

        inventario.sacar("Madera", 15)

        expect(
            inventario.almacenamiento.capacidades.get("Piedra")
        ).toBe(50)
    })

    it("Un inventario puede sacar todo un tipo", () => {
        const inventario = crearInventario()

        inventario.guardarTipo("Madera", 20)
        inventario.eliminarTipo("Madera")

        expect(
            inventario.almacenamiento.tiene("Madera",1)
        ).toBe(false)
    })

    it("Un inventario permite consultar si tiene una cantidad de un tipo", () => {
        const inventario = crearInventario()

        inventario.guardarTipo("Madera", 10)

        expect(inventario.tiene("Madera", 5)).toBe(true)
    })

    it("Un inventario permite consultar la cantidad de un tipo", () => {
        const inventario = crearInventario()
        inventario.guardarTipo("Madera", 15)

        expect(inventario.consultarCantidad("Madera")).toBe(15)
    })
})