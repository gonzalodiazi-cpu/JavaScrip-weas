import { describe, it, expect } from "vitest";
import { Desempleado } from "@src/sociedad/trabajos/Desempleado.js";
import { Leñador } from "@src/sociedad/trabajos/Leñador.js";

describe("Leñador", () => {
  it("Un leñador tiene un bono de tala mayor que un desempleado", () => {
    // preparar
    const desempleado = new Desempleado()
    const leñador = new Leñador()

    // ejecutar


    // comprobar
    expect(leñador.bonoTala).toBeGreaterThan(desempleado.bonoTala)
  })

  it("Un leñador tiene una velocidad de tala mayor que un desempleado", () => {
    // preparar
    const desempleado = new Desempleado()
    const leñador = new Leñador()

    // ejecutar


    // comprobar
    expect(leñador.velocidadTala).toBeGreaterThan(desempleado.velocidadTala)
  })

})