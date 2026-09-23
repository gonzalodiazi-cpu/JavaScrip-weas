import { describe, it, expect, vi } from "vitest"
import { ActividadRecibirDeAlmacen } from "../../../src/sociedad/actividades/ActividadRecibirDeAlmacen"

describe("ActividadRecibirDeAlmacen", () => {

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

        const actividad = new ActividadRecibirDeAlmacen(
            colono,
            objetivo,
            "madera",
            5
        )

        actividad.actualizar()

        expect(colono.establecerDestino)
            .toHaveBeenCalledWith(objetivo.posicion)
    })

    it("Un colono recibe recursos cuando llega al almacenamiento", () => {
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
            estaEnPosObj: vi.fn(() => true),
            terminarActividad: vi.fn()
        }

        const actividad = new ActividadRecibirDeAlmacen(
            colono,
            objetivo,
            "madera",
            5
        )

        actividad.puedeRecibirDesdeAlmacen = vi.fn(() => true)
        actividad.recibirDesdeAlmacenamiento = vi.fn()

        actividad.actualizar()

        expect(actividad.recibirDesdeAlmacenamiento)
            .toHaveBeenCalledWith(almacenamiento, "madera", 5)
    })

    it("Una actividad recibir termina cuando recibe los recursos", () => {
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

        const actividad = new ActividadRecibirDeAlmacen(
            colono,
            objetivo,
            "madera",
            5
        )

        actividad.puedeRecibirDesdeAlmacen = vi.fn(() => true)
        actividad.recibirDesdeAlmacenamiento = vi.fn()
        actividad.terminarActividad = vi.fn()

        actividad.actualizar()

        expect(actividad.terminarActividad)
            .toHaveBeenCalled()
    })

    it("Una actividad recibir fracasa si el colono no puede recibir los recursos", () => {
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

        const actividad = new ActividadRecibirDeAlmacen(
            colono,
            objetivo,
            "madera",
            5
        )

        actividad.puedeRecibirDesdeAlmacen = vi.fn(() => false)
        actividad.recibirDesdeAlmacenamiento = vi.fn()
        actividad.terminarActividad = vi.fn()

        actividad.actualizar()

        expect(actividad.recibirDesdeAlmacenamiento)
            .not.toHaveBeenCalled()

        expect(actividad.terminarActividad)
            .toHaveBeenCalled()

        expect(actividad.resultado)
            .toBe("Fracaso")
    })

    it("Una actividad recibir no hace nada mientras el colono está en camino", () => {
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

        const actividad = new ActividadRecibirDeAlmacen(
            colono,
            objetivo,
            "madera",
            5
        )

        actividad.puedeRecibirDesdeAlmacen = vi.fn()
        actividad.recibirDesdeAlmacenamiento = vi.fn()
        actividad.terminarActividad = vi.fn()

        actividad.actualizar()

        expect(actividad.recibirDesdeAlmacenamiento)
            .not.toHaveBeenCalled()

        expect(actividad.terminarActividad)
            .not.toHaveBeenCalled()
    })
})