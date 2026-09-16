import { describe, it, expect } from "vitest"
import { Ayuntamiento } from "@src/sociedad/Ayuntamiento.js"
import { Mundo } from "../../src/mundo/Mundo"

describe("Ayuntamiento", () => {
    it("Un ayuntamiento tiene una posición", () => {
        const mundo = new Mundo(1200,800)

        const ayuntamiento = new Ayuntamiento(mundo)

        expect(ayuntamiento.posicion).toEqual({x:600,y:400})
    })
    it("Un ayuntamiento tiene una imagen", () => {
        const mundo = new Mundo()
        const ayuntamiento = new Ayuntamiento(mundo)

        expect(ayuntamiento.imagen).toBe("Ayuntamiento")
    })
})