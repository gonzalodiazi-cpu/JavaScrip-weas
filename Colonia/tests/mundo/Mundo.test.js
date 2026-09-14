import { describe, it, expect } from "vitest";
import { Mundo } from "@src/mundo/Mundo.js";

describe("Mundo", () => {
  it("Un mundo comienza sin árboles ni recursos", () => {
    // ejecutar
    const mundo = new Mundo()

    // comprobar
    expect(mundo.arboles.size).toBe(0)
    expect(mundo.recursos.size).toBe(0)
  })
})