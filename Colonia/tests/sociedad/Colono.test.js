import { describe, it, expect } from "vitest";
import { Colonia } from "@src/sociedad/Colonia.js";
import { Colono } from "@src/sociedad/Colono.js";

describe("Colono", () => {
  it("Un colono tiene una posición al ser creado", () => {
    const colonia = new Colonia();
    const posicion = { x: 10, y: 5 };

    const colono = new Colono("Juan", colonia, posicion);

    expect(colono.posicion).toEqual(posicion);
  });
  it("Un colono nuevo comienza desempleado", () => {
  // preparar
    const colonia = new Colonia()
    const posicion = { x: 10, y: 5 }

  // ejecutar
    const colono = new Colono("Juan", colonia, posicion)

  // comprobar
    expect(colono.trabajo).toBe(null)
  })
  it("Un colono desempleado puede recibir un trabajo", () => {
  // preparar
    const colonia = new Colonia()
    const posicion = { x: 10, y: 5 }
    const colono = new Colono("Juan", colonia, posicion)

  // ejecutar
    colono.asignarTrabajo("leñador")

  // comprobar
    expect(colono.trabajo).toBe("leñador")
  })
});