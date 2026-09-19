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
            colonos: [],
            colonias: []
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
            colonos: [],
            colonias: []
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
            objetos: [],
            colonias: []
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

        const botonConstruirCasa = {
            hidden: true
        }
        const casa = {
            posicion: { x: 400, y: 100 },
            ancho: 100,
            alto: 100
        }
        const colonia = {
            casas: new Map([
                ["Casa 1", casa]
            ]),
            ayuntamiento: {
                posicion: {x:900, y:500},
                ancho:200,
                alto:200
            }
        }

        const mundo = {
            objetos: [],
            colonos: [],
            colonias: [colonia]
        }

        const interfaz = new Interfaz(canvas, mundo, botonConstruirCasa)

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

    it("Encuentra una casa bajo el mouse", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                if (evento === "mousemove") {
                    canvas.funcionMouse = funcion
                }
            }
        }

        const casa = {
            posicion: { x: 100, y: 100 },
            ancho: 100,
            alto: 100
        }

        const colonia = {
            casas: new Map([
                ["Casa 1", casa]
            ]),
            ayuntamiento: {
                posicion: {x:300, y:500},
                ancho:200,
                alto:200
            }
        }

        const mundo = {
            objetos: [],
            colonos: [],
            colonias: [colonia]
        }

        const interfaz = new Interfaz(canvas, mundo)

        canvas.funcionMouse({
            clientX: 100,
            clientY: 50
        })

        expect(interfaz.objetoBajoMouse()).toBe(casa)
    })
    it("Encuentra el ayuntamiento bajo el mouse", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                if (evento === "mousemove") {
                    canvas.funcionMouse = funcion
                }
            }
        }

        const ayuntamiento = {
            posicion: { x: 100, y: 100 },
            ancho: 200,
            alto: 200
        }

        const colonia = {
            casas: new Map(),
            ayuntamiento: ayuntamiento
        }

        const mundo = {
            objetos: [],
            colonos: [],
            colonias: [colonia]
        }

        const interfaz = new Interfaz(canvas, mundo)

        canvas.funcionMouse({
            clientX: 100,
            clientY: 50
        })

        expect(interfaz.objetoBajoMouse()).toBe(ayuntamiento)
    })
    it("Selecciona el ayuntamiento al hacer click", () => {
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

        const ayuntamiento = {
            posicion: { x: 100, y: 100 },
            ancho: 200,
            alto: 200
        }

        const colonia = {
            casas: new Map(),
            ayuntamiento: ayuntamiento
        }

        const mundo = {
            objetos: [],
            colonos: [],
            colonias: [colonia]
        }
        const botonConstruirCasa = {
            hidden: true
        }

        const interfaz = new Interfaz(canvas, mundo, botonConstruirCasa)

        canvas.funcionMouse({
            clientX: 100,
            clientY: 50
        })

        canvas.funcionClick({})

        expect(interfaz.objetoSeleccionado).toBe(ayuntamiento)
    })

    it("Muestra el botón de construir casa al seleccionar el ayuntamiento", () => {
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

        const botonConstruirCasa = {
            hidden: true
        }

        const ayuntamiento = {
            posicion: { x: 100, y: 100 },
            ancho: 200,
            alto: 200
        }

        const colonia = {
            casas: new Map(),
            ayuntamiento: ayuntamiento
        }

        const mundo = {
            objetos: [],
            colonos: [],
            colonias: [colonia]
        }

        const interfaz = new Interfaz(canvas, mundo, botonConstruirCasa)

        canvas.funcionMouse({
            clientX: 100,
            clientY: 50
        })

        canvas.funcionClick({})

        expect(botonConstruirCasa.hidden).toBe(false)
    })

    it("Oculta el botón de construir casa al seleccionar otro objeto", () => {
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

        const botonConstruirCasa = {
            hidden: false
        }

        const objeto = {
            posicion: { x: 100, y: 100 },
            ancho: 50,
            alto: 50
        }

        const mundo = {
            objetos: [objeto],
            colonos: [],
            colonias: []
        }

        const interfaz = new Interfaz(canvas, mundo, botonConstruirCasa)

        canvas.funcionMouse({
            clientX: 100,
            clientY: 75
        })

        canvas.funcionClick({})

        expect(botonConstruirCasa.hidden).toBe(true)
    })

    it("Activa el modo de construir casa al hacer click en el botón", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                if (evento === "click") {
                    canvas.funcionClick = funcion
                }
            }
        }

        const botonConstruirCasa = {
            hidden: false,
            addEventListener: (evento, funcion) => {
                botonConstruirCasa.funcionClick = funcion
            }
        }

        const mundo = {
            objetos: [],
            colonos: [],
            colonias: []
        }

        const interfaz = new Interfaz(canvas, mundo, botonConstruirCasa)

        botonConstruirCasa.funcionClick({})

        expect(interfaz.construyendoCasa).toBe(true)
    })
})