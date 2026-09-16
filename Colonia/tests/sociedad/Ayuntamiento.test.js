import { describe, it, expect } from "vitest"
import { Ayuntamiento } from "@src/sociedad/Ayuntamiento.js"

describe("Ayuntamiento", () => {
    it("Un ayuntamiento tiene una posición", () => {
        const posicion = { x: 300, y: 200 }

        const ayuntamiento = new Ayuntamiento(posicion)

        expect(ayuntamiento.posicion).toEqual(posicion)
    })
})