import { describe, it, expect, vi } from "vitest"
import { ActividadEntregarAAlmacen } from "../../../src/sociedad/actividades/ActividadEntregarAAlmacen"

describe("ActividadEntregarAAlmacen", () => {

    it("Un colono se dirige al almacenamiento", () => {
        const almacenamiento = {}

        const objetivo = {
            posicion: { x: 10, y: 20 },
            almacenamiento
        }

        const colono = {
            colonia: {
                mundo: {}
            },
            inventario: {},
            trabajo: {},
            posicion: { x: 0, y: 0 },
            destino: null,
            establecerDestino: vi.fn(),
            estaEnPosObj: vi.fn(() => false)
        }

        const actividad = new ActividadEntregarAAlmacen(
            colono,
            objetivo,
            "madera",
            5
        )

        actividad.actualizar()

        expect(colono.establecerDestino)
            .toHaveBeenCalledWith(objetivo.posicion)
    })

    it("Un colono entrega recursos cuando llega al almacenamiento", () => {
        const almacenamiento = {}

        const objetivo = {
            posicion: { x: 10, y: 20 },
            almacenamiento
        }

        const colono = {
            colonia: {
                mundo: {}
            },
            inventario: {},
            trabajo: {},
            posicion: { x: 10, y: 20 },
            destino: null,
            establecerDestino: vi.fn(),
            estaEnPosObj: vi.fn(() => true),
            terminarActividad: vi.fn()
        }

        const actividad = new ActividadEntregarAAlmacen(
            colono,
            objetivo,
            "madera",
            5
        )

        actividad.puedeEntregarAAlmacen = vi.fn(() => true)
        actividad.entregarAAlmacenamiento = vi.fn()

        actividad.actualizar()

        expect(actividad.entregarAAlmacenamiento)
            .toHaveBeenCalledWith(almacenamiento, "madera", 5)
    })

    it("Una actividad entregar termina cuando entrega los recursos", () => {
        const almacenamiento = {}

        const objetivo = {
            posicion: { x: 10, y: 20 },
            almacenamiento
        }

        const colono = {
            colonia: {
                mundo: {}
            },
            inventario: {},
            trabajo: {},
            destino: null,
            establecerDestino: vi.fn(),
            estaEnPosObj: vi.fn(() => true)
        }

        const actividad = new ActividadEntregarAAlmacen(
            colono,
            objetivo,
            "madera",
            5
        )

        actividad.puedeEntregarAAlmacen = vi.fn(() => true)
        actividad.entregarAAlmacenamiento = vi.fn()
        actividad.terminarActividad = vi.fn()

        actividad.actualizar()

        expect(actividad.terminarActividad)
            .toHaveBeenCalled()
    })

    it("Una actividad entregar fracasa si el colono no puede entregar los recursos", () => {
        const almacenamiento = {}

        const objetivo = {
            posicion: { x: 10, y: 20 },
            almacenamiento
        }

        const colono = {
            colonia: {
                mundo: {}
            },
            inventario: {},
            trabajo: {},
            destino: null,
            establecerDestino: vi.fn(),
            estaEnPosObj: vi.fn(() => true)
        }

        const actividad = new ActividadEntregarAAlmacen(
            colono,
            objetivo,
            "madera",
            5
        )

        actividad.puedeEntregarAAlmacen = vi.fn(() => false)
        actividad.entregarAAlmacenamiento = vi.fn()
        actividad.terminarActividad = vi.fn()

        actividad.actualizar()

        expect(actividad.entregarAAlmacenamiento)
            .not.toHaveBeenCalled()

        expect(actividad.terminarActividad)
            .toHaveBeenCalled()

        expect(actividad.resultado)
            .toBe("Fracaso")
    })

    it("Una actividad entregar no hace nada mientras el colono está en camino", () => {
        const almacenamiento = {}

        const objetivo = {
            posicion: { x: 10, y: 20 },
            almacenamiento
        }

        const colono = {
            colonia: {
                mundo: {}
            },
            inventario: {},
            trabajo: {},
            destino: objetivo.posicion,
            establecerDestino: vi.fn(),
            estaEnPosObj: vi.fn(() => false)
        }

        const actividad = new ActividadEntregarAAlmacen(
            colono,
            objetivo,
            "madera",
            5
        )

        actividad.puedeEntregarAAlmacen = vi.fn()
        actividad.entregarAAlmacenamiento = vi.fn()
        actividad.terminarActividad = vi.fn()

        actividad.actualizar()

        expect(actividad.entregarAAlmacenamiento)
            .not.toHaveBeenCalled()

        expect(actividad.terminarActividad)
            .not.toHaveBeenCalled()
    })
})