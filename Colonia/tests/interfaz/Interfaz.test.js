import { describe, it, expect } from "vitest"
import { Interfaz } from "@src/interfaz/Interfaz.js"

describe("Interfaz", () => {
    it("Conoce la posición del mouse", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                canvas.funcionMouse = funcion
            },
            getBoundingClientRect: () => ({
                left: 0,
                top: 0
            })
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


    it("No encuentra un objeto si el mouse está fuera", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                if (evento === "mousemove") {
                    canvas.funcionMouse = funcion
                }
            },
            getBoundingClientRect: () => ({
                left: 0,
                top: 0
            })

        }

        const mundo = {
            colonos: [],
            colonias: []
        }

        const interfaz = new Interfaz(canvas, mundo)


        canvas.funcionMouse({
            clientX: 200,
            clientY: 200
        })

        expect(interfaz.objetoBajoMouse()).toBe(null)
    })

    it("Da prioridad a un colono sobre una casa", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                if (evento === "mousemove") {
                    canvas.funcionMouse = funcion
                }
            },
            getBoundingClientRect: () => ({
                left: 0,
                top: 0
            })
        }

        const casa = {
            posicion: { x: 100, y: 100 },
            ancho: 50,
            alto: 50
        }

        const colono = {
            posicion: { x: 100, y: 100 },
            ancho: 50,
            alto: 50
        }

        const colonia = {
            casas: new Map([
                ["Casa 1", casa]
            ]),
            ayuntamiento: {
                posicion: { x: 500, y: 500 },
                ancho: 200,
                alto: 200
            }
        }

        const mundo = {
            colonos: [colono],
            colonias: [colonia]
        }

        const interfaz = new Interfaz(canvas, mundo)

        canvas.funcionMouse({
            clientX: 100,
            clientY: 75
        })

        expect(interfaz.objetoBajoMouse()).toBe(colono)
    })
    
    it("Selecciona la casa bajo el mouse al hacer click", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                if (evento === "mousemove") {
                    canvas.funcionMouse = funcion
                }

                if (evento === "click") {
                    canvas.funcionClick = funcion
                }
            },
            getBoundingClientRect: () => ({
                left: 0,
                top: 0
            })
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
                posicion: { x: 900, y: 500 },
                ancho: 200,
                alto: 200
            }
        }

        const mundo = {
            colonos: [],
            colonias: [colonia]
        }

        const interfaz = new Interfaz(
            canvas,
            mundo,
            botonConstruirCasa
        )

        canvas.funcionMouse({
            clientX: 400,
            clientY: 50
        })

        canvas.funcionClick({})

        expect(interfaz.objetoSeleccionado).toBe(casa)
    })


    it("Encuentra una casa bajo el mouse", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                if (evento === "mousemove") {
                    canvas.funcionMouse = funcion
                }
            },
            getBoundingClientRect: () => ({
                left: 0,
                top: 0
            })
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
            },
            getBoundingClientRect: () => ({
                left: 0,
                top: 0
            })
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
            },
            getBoundingClientRect: () => ({
                left: 0,
                top: 0
            })
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
            },
            getBoundingClientRect: () => ({
                left: 0,
                top: 0
            })
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
            },
            getBoundingClientRect: () => ({
                left: 0,
                top: 0
            })
        }

        const botonConstruirCasa = {
            hidden: false
        }

        const arbol = {
            posicion: { x: 100, y: 100 },
            ancho: 50,
            alto: 50
        }

        const mundo = {
            arboles: [],
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


    it("Muestra el input para escribir el nombre al construir", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                canvas.funcionClick = funcion
            },
            getBoundingClientRect: () => ({
                left: 0,
                top: 0
            })
        }

        const botonConstruirCasa = {
            hidden: false,
            addEventListener: (evento, funcion) => {
                botonConstruirCasa.funcionClick = funcion
            }
        }

        const inputNombre = {
            hidden: true
        }

        const mundo = {
            colonos: [],
            colonias: []
        }

        const interfaz = new Interfaz(
            canvas,
            mundo,
            botonConstruirCasa,
            inputNombre
        )

        botonConstruirCasa.funcionClick({})

        expect(inputNombre.hidden).toBe(false)
    })

    it("Activa el modo de construir casa al presionar Enter", () => {
        const canvas = {
            addEventListener: () => {},
            getBoundingClientRect: () => ({
                left: 0,
                top: 0
            })
        }

        const botonConstruirCasa = {
            hidden: false,
            addEventListener: () => {}
        }

        const inputNombre = {
            hidden: false,
            value: "Casa",
            addEventListener: (evento, funcion) => {
                inputNombre.funcionKeydown = funcion
            }
        }

        const mundo = {
            colonos: [],
            colonias: []
        }

        const interfaz = new Interfaz(
            canvas,
            mundo,
            botonConstruirCasa,
            inputNombre
        )

        inputNombre.funcionKeydown({ key: "Enter" })

        expect(interfaz.construyendoCasa).toBe(true)
        expect(interfaz.nombreCasaEnConstruccion).toBe("Casa")
    })
    it("Actualiza la posición de la casa en construcción con el mouse", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                if (evento === "mousemove") {
                    canvas.funcionMouse = funcion
                }
            },
            getBoundingClientRect: () => ({
                left: 100,
                top: 50
            })
        }

        const botonConstruirCasa = {
            hidden: false,
            addEventListener: (evento, funcion) => {
                botonConstruirCasa.funcionClick = funcion
            }
        }

        const mundo = {
            colonos: [],
            colonias: []
        }

        const inputNombre = {
            value: "Casa",
            addEventListener: (evento, funcion) => {
                inputNombre.funcionKeydown = funcion
            }
        }

        const interfaz = new Interfaz(
            canvas,
            mundo,
            botonConstruirCasa,
            inputNombre
        )

        botonConstruirCasa.funcionClick({})
        inputNombre.funcionKeydown({ key: "Enter" })

        canvas.funcionMouse({
            clientX: 250,
            clientY: 250
        })

        expect(interfaz.posicionCasaEnConstruccion).toEqual({
            x: 150,
            y: 200
        })
    })
    it("Crea una casa al hacer click mientras está construyendo", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                if (evento === "mousemove") {
                    canvas.funcionMouse = funcion
                }

                if (evento === "click") {
                    canvas.funcionClick = funcion
                }
            },
            getBoundingClientRect: () => ({
                left: 0,
                top: 0
            })
        }

        const botonConstruirCasa = {
            hidden: false,
            addEventListener: (evento, funcion) => {
                botonConstruirCasa.funcionClick = funcion
            }
        }

        const colonia = {
            casas: new Map(),
            ayuntamiento: {
                posicion: { x: 500, y: 500 },
                ancho: 200,
                alto: 200
            },
            crearCasa: (nombre, posicion) => {
                colonia.casaCreada = {
                    nombre: nombre,
                    posicion: posicion
                }
            }
        }

        colonia.ayuntamiento.colonia = colonia

        const mundo = {
            colonos: [],
            colonias: [colonia]
        }

        const inputNombre = {
            hidden:false,
            value: "Casa",
            addEventListener: (evento, funcion) => {
                inputNombre.funcionKeydown = funcion
            }
        }

        const interfaz = new Interfaz(
            canvas,
            mundo,
            botonConstruirCasa,
            inputNombre
        )

        canvas.funcionMouse({
            clientX: 500,
            clientY: 400
        })

        canvas.funcionClick({})


        botonConstruirCasa.funcionClick({})
        inputNombre.funcionKeydown({ key: "Enter" })

        canvas.funcionMouse({
            clientX: 150,
            clientY: 200
        })

        canvas.funcionClick({})

        expect(inputNombre.hidden).toBe(true)
        expect(inputNombre.value).toBe("")
        expect(colonia.casaCreada).toEqual({
            nombre: "Casa",
            posicion: {
                x: 150,
                y: 200
            }
        })
    })

    it("Crea una casa con el nombre indicado", () => {
        const canvas = {
            addEventListener: (evento, funcion) => {
                if (evento === "mousemove") {
                    canvas.funcionMouse = funcion
                }

                if (evento === "click") {
                    canvas.funcionClick = funcion
                }
            },
            getBoundingClientRect: () => ({
                left: 0,
                top: 0
            })
        }

        const botonConstruirCasa = {
            hidden: false,
            addEventListener: (evento, funcion) => {
                botonConstruirCasa.funcionClick = funcion
            }
        }

        const colonia = {
            casas: new Map(),
            ayuntamiento: {
                posicion: { x: 500, y: 500 },
                ancho: 200,
                alto: 200
            },
            crearCasa: (nombre, posicion) => {
                colonia.casaCreada = {
                    nombre: nombre,
                    posicion: posicion
                }
            }
        }

        colonia.ayuntamiento.colonia = colonia

        const mundo = {
            colonos: [],
            colonias: [colonia]
        }
        
        const inputNombre = {
            value: "Casa de Juan",
            addEventListener: (evento, funcion) => {
                inputNombre.funcionKeydown = funcion
            }
        }

        const interfaz = new Interfaz(
            canvas,
            mundo,
            botonConstruirCasa,
            inputNombre
        )

        canvas.funcionMouse({
            clientX: 500,
            clientY: 400
        })

        canvas.funcionClick({})


        botonConstruirCasa.funcionClick({})
        inputNombre.funcionKeydown({ key: "Enter" })

        canvas.funcionMouse({
            clientX: 150,
            clientY: 200
        })


        canvas.funcionClick({})

        expect(colonia.casaCreada).toEqual({
            nombre: "Casa de Juan",
            posicion: {
                x: 150,
                y: 200
            }
        })
    })
})