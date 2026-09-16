import { describe, it, expect } from "vitest";
import { Colonia } from "@src/sociedad/Colonia.js";
import { Casa } from "../../src/sociedad/Casa"; 
import { Ayuntamiento } from "../../src/sociedad/Ayuntamiento";
import { crearColonia } from "../helpers/crearColonia";

describe("Casa", () => {
  it("Una casa tiene una imagen", () => {
    const colonia = crearColonia()
    const casa = new Casa("Casa 1", colonia, { x: 100, y: 100 })

    expect(casa.imagen).toBe("Casa")
  })

  it("crea un colono y descuenta comida de la colonia", () => {
    const colonia = crearColonia();
    const comida_Actual = colonia.comida;

    colonia.crearCasa("Casa 1");

    const casa = colonia.casas.get("Casa 1");

    casa.crearColono("Juan", { x: 5, y: 10 });

    expect(colonia.comida).toBe(comida_Actual - casa.costoCrearColono);
    expect(casa.colonos.size).toBe(1);
    expect(casa.colonos.get("Juan").nombre).toBe("Juan");
  });

  it("no crea un colono cuando la casa está llena", () => {
    const colonia = crearColonia();

    colonia.crearCasa("Casa 1");

    const casa = colonia.casas.get("Casa 1");

    casa.crearColono("Juan", { x: 5, y: 10 });
    casa.crearColono("Pedro", { x: 6, y: 10 });
    casa.crearColono("Luis", { x: 7, y: 10 });

    expect(casa.colonos.size).toBe(casa.capacidad);
    expect(casa.colonos.has("Luis")).toBe(false);
  });

  it("no crea colono si la colonia no tiene suficiente comida", () => {
    const colonia = crearColonia();

    colonia.crearCasa("Casa 1");

    const casa = colonia.casas.get("Casa 1");

    colonia.gastarComida(150);

    casa.crearColono("Juan", { x: 5, y: 10 });
    casa.crearColono("Pedro", { x: 6, y: 10 });

    expect(casa.colonos.size).toBe(1);
    expect(casa.colonos.has("Pedro")).toBe(false);
  });
});