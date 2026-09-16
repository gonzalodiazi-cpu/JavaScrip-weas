import { describe, it, expect } from "vitest";
import { Colonia } from "@src/sociedad/Colonia.js";
import { Leñador } from "@src/sociedad/trabajos/Leñador.js"

describe("Colonia", () => {
  it("crea una casa con capacidad 2 y descuenta su costo", () => {
    const colonia = new Colonia();
    const dinero_Actual = colonia.dinero;

    colonia.crearCasa("Casa 1");

    expect(colonia.dinero).toBe(dinero_Actual - colonia.costoCrearCasa);
    expect(colonia.casas.size).toBe(1);
    expect(colonia.casas.get("Casa 1").capacidad).toBe(2);
  });

  it("Una colonia no puede crear mas casas que ayuntamiento.capacidadCasas", () => {
    const colonia = new Colonia();

    colonia.crearCasa("Casa 1");
    colonia.crearCasa("Casa 2");
    colonia.crearCasa("Casa 3");

    expect(colonia.casas.size).toBe(colonia.ayuntamiento.capacidadCasas);
    expect(colonia.casas.has("Casa 3")).toBe(false);
  });

  it("Una colonia no puede crear casas si no tiene dinero suficiente", () => {
    const colonia = new Colonia();

    colonia.gastarDinero(colonia.dinero - colonia.costoCrearCasa);
    colonia.crearCasa("Casa 1");
    colonia.crearCasa("Casa 2");

    expect(colonia.casas.size).toBe(1);
    expect(colonia.casas.has("Casa 2")).toBe(false);
  });

  it("una colonia tiene instanciado un trabajo, en este caso leñador", () => {
    const colonia = new Colonia();

    expect(colonia.leñador).toBeInstanceOf(Leñador);
  });
});