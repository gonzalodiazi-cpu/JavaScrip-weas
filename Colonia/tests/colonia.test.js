import { describe, it, expect } from "vitest";
import { Colonia } from "@src/Colonia.js";

describe("Colonia", () => {
  it("crea una casa con capacidad 2 y descuenta 100 de dinero", () => {
    const colonia = new Colonia();

    colonia.crearCasa("Casa 1");

    expect(colonia.dinero).toBe(400);
    expect(colonia.casas.size).toBe(1);
    expect(colonia.casas.get("Casa 1").capacidad).toBe(2);
  });

  it("crea un colono y descuenta comida de la colonia", () => {
    const colonia = new Colonia();

    colonia.crearCasa("Casa 1");

    const casa = colonia.casas.get("Casa 1");

    casa.crearColono("Juan");

    expect(colonia.comida).toBe(50);
    expect(casa.colonos.size).toBe(1);
    expect(casa.colonos.get("Juan").nombre).toBe("Juan");
  });
});

it("no crea un colono cuando la casa está llena", () => {
  const colonia = new Colonia();

  colonia.crearCasa("Casa 1");

  const casa = colonia.casas.get("Casa 1");

  casa.crearColono("Juan");
  casa.crearColono("Pedro");
  casa.crearColono("Luis");

  expect(casa.colonos.size).toBe(casa.capacidad);
  expect(casa.colonos.has("Luis")).toBe(false);
});