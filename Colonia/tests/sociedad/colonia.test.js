import { describe, it, expect } from "vitest";
import { Colonia } from "@src/sociedad/Colonia.js";

describe("Colonia", () => {
  it("crea una casa con capacidad 2 y descuenta su costo", () => {
    const colonia = new Colonia();
    const dinero_Actual=colonia.dinero
    colonia.crearCasa("Casa 1");

    expect(colonia.dinero).toBe(dinero_Actual-colonia.costoCrearCasa);
    expect(colonia.casas.size).toBe(1);
    expect(colonia.casas.get("Casa 1").capacidad).toBe(2);
  });

  it("crea un colono y descuenta comida de la colonia", () => {
    const colonia = new Colonia();

    const comida_Actual = colonia.comida;

    colonia.crearCasa("Casa 1");

    const casa = colonia.casas.get("Casa 1");

    casa.crearColono("Juan");

    expect(colonia.comida).toBe(comida_Actual - casa.costoCrearColono);
    expect(casa.colonos.size).toBe(1);
    expect(casa.colonos.get("Juan").nombre).toBe("Juan");
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

  it("no crea colono si la colonia no tiene suficiente comida", () => {
    // preparar
    const colonia = new Colonia();

    colonia.crearCasa("Casa 1");

    const casa = colonia.casas.get("Casa 1");

    // ejecutar
    colonia.gastarComida(150);

    casa.crearColono("Juan");
    casa.crearColono("Pedro");

    // comprobar
    expect(casa.colonos.size).toBe(1);
    expect(casa.colonos.has("Pedro")).toBe(false);
  });

  it("Una colonia no puede crear mas casas que ayuntamiento.capacidadCasas", () => {
  // preparar
    const colonia = new Colonia()

  // ejecutar
    colonia.crearCasa("Casa 1")
    colonia.crearCasa("Casa 2")
    colonia.crearCasa("Casa 3")

  // comprobar
    expect(colonia.casas.size).toBe(colonia.ayuntamiento.capacidadCasas)
    expect(colonia.casas.has("Casa 3")).toBe(false)
  });

  it("Una colonia no puede crear casas si no tiene dinero suficiente", () => {
  // preparar
    const colonia = new Colonia()
    
  // ejecutar
    colonia.gastarDinero(colonia.dinero - colonia.costoCrearCasa)
    colonia.crearCasa("Casa 1")
    colonia.crearCasa("Casa 2")

  // comprobar
    expect(colonia.casas.size).toBe(1)
    expect(colonia.casas.has("Casa 2")).toBe(false)
  });
});
