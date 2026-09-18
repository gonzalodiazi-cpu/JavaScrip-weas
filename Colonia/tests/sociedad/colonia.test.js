import { describe, it, expect } from "vitest";
import { Colonia } from "@src/sociedad/Colonia.js";
import { Leñador } from "@src/sociedad/trabajos/Leñador.js"
import { crearColonia } from "../helpers/crearColonia";

describe("Colonia", () => {
  it("Una colonia pertenece a un mundo", () => {
    const mundo = {}
    const colonia = new Colonia(mundo)

    expect(colonia.mundo).toBe(mundo)
  })
  it("Una colonia crea una casa en la posición indicada", () => {
    const colonia = crearColonia()

    colonia.crearCasa("Casa 1", {x: 500, y: 700})

    const casa = colonia.casas.get("Casa 1")

    expect(casa.posicion).toEqual({x: 500, y: 700})
  })
  it("Crea una casa con capacidad 2 y descuenta su costo", () => {
    const colonia = crearColonia();
    const dinero_Actual = colonia.dinero;

    colonia.crearCasa("Casa 1", {x:500,y:700});

    expect(colonia.dinero).toBe(dinero_Actual - colonia.costoCrearCasa);
    expect(colonia.casas.size).toBe(1);
    expect(colonia.casas.get("Casa 1").capacidad).toBe(2);
  });

  it("Una colonia no puede crear mas casas que ayuntamiento.capacidadCasas", () => {
    const colonia = crearColonia();

    colonia.crearCasa("Casa 1", {x: 500, y: 700});
    colonia.crearCasa("Casa 2", {x: 600, y: 700});
    colonia.crearCasa("Casa 3", {x: 700, y: 700});

    expect(colonia.casas.size).toBe(colonia.ayuntamiento.capacidadCasas);
    expect(colonia.casas.has("Casa 3")).toBe(false);
  });

  it("Una colonia no puede crear casas si no tiene dinero suficiente", () => {
    const colonia = crearColonia();

    colonia.gastarDinero(colonia.dinero - colonia.costoCrearCasa);
    colonia.crearCasa("Casa 1", {x: 500, y: 700});
    colonia.crearCasa("Casa 2", {x: 500, y: 600});

    expect(colonia.casas.size).toBe(1);
    expect(colonia.casas.has("Casa 2")).toBe(false);
  });

  it("una colonia tiene instanciado un trabajo, en este caso leñador", () => {
    const colonia = crearColonia();

    expect(colonia.leñador).toBeInstanceOf(Leñador);
  });
});