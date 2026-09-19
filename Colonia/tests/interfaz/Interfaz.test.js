import { describe, it, expect } from "vitest"
import { Interfaz } from "@src/interfaz/Interfaz.js"

describe("Interfaz", () => {
    it("Conoce la posición del mouse", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                canvas.funcionMouse = funcion
            }
        }

        const mundo = {}

        const interfaz = new Interfaz(canvas, mundo)

        canvas.funcionMouse({
            clientX: 100,
            clientY: 200
        })

        expect(interfaz.mouse).toEqual({
            x: 100,
            y: 200
        })
    })

    it("Encuentra el objeto bajo el mouse", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                if (evento === "mousemove") {
                    canvas.funcionMouse = funcion
                }
            }
        }

        const mundo = {
            objetos: [],
            colonos: []
        }

        const interfaz = new Interfaz(canvas, mundo)

        const objeto = {
            posicion: { x: 100, y: 100 },
            ancho: 50,
            alto: 50
        }

        mundo.objetos.push(objeto)

        canvas.funcionMouse({
            clientX: 100,
            clientY: 75
        })

        expect(interfaz.objetoBajoMouse()).toBe(objeto)
    })

    it("No encuentra un objeto si el mouse está fuera", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                if (evento === "mousemove") {
                    canvas.funcionMouse = funcion
                }
            }
        }

        const mundo = {
            objetos: [],
            colonos: []
        }

        const interfaz = new Interfaz(canvas, mundo)

        const objeto = {
            posicion: { x: 100, y: 100 },
            ancho: 50,
            alto: 50
        }

        mundo.objetos.push(objeto)

        canvas.funcionMouse({
            clientX: 200,
            clientY: 200
        })

        expect(interfaz.objetoBajoMouse()).toBe(null)
    })

    it("Da prioridad a un colono sobre otro objeto", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                if (evento === "mousemove") {
                    canvas.funcionMouse = funcion
                }
            }
        }

        const mundo = {
            colonos: [],
            objetos: []
        }

        const interfaz = new Interfaz(canvas, mundo)

        const objeto = {
            posicion: { x: 100, y: 100 },
            ancho: 50,
            alto: 50
        }

        const colono = {
            posicion: { x: 100, y: 100 },
            ancho: 50,
            alto: 50
        }

        mundo.objetos.push(objeto)
        mundo.colonos.push(colono)

        canvas.funcionMouse({
            clientX: 100,
            clientY: 75
        })

        expect(interfaz.objetoBajoMouse()).toBe(colono)
    })
    it("Selecciona el objeto bajo el mouse al hacer click", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                if (evento === "mousemove") {
                    canvas.funcionMouse = funcion
                }

                if (evento === "click") {
                    canvas.funcionClick = funcion
                }
            }
        }

        const mundo = {
            objetos: [],
            colonos: []
        }

        const interfaz = new Interfaz(canvas, mundo)

        const objeto = {
            posicion: { x: 100, y: 100 },
            ancho: 50,
            alto: 50
        }

        mundo.objetos.push(objeto)

        canvas.funcionMouse({
            clientX: 100,
            clientY: 75
        })

        canvas.funcionClick({})

        expect(interfaz.objetoSeleccionado).toBe(objeto)
    })
})