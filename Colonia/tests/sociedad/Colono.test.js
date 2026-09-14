import { describe, it, expect } from "vitest";
import { Colonia } from "@src/sociedad/Colonia.js";
import { Colono } from "@src/sociedad/Colono.js";
import { Desempleado } from "@src/sociedad/trabajos/Desempleado.js";
import { Arbol } from "@src/mundo/Arbol.js";
import { Leñador } from "@src/sociedad/trabajos/Leñador.js";

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
    expect(colono.trabajo).toBeInstanceOf(Desempleado)
  })

  it("Un colono puede cambiar de trabajo", () => {
    // preparar
    const colonia = new Colonia()
    const posicion = { x: 10, y: 5 }
    const colono = new Colono("Juan", colonia, posicion)
    const nuevoTrabajo = new Desempleado()

    // ejecutar
    colono.asignarTrabajo(nuevoTrabajo)

    // comprobar
    expect(colono.trabajo).toBe(nuevoTrabajo)
  })

  it("Un colono puede talar un árbol", () => {
    // preparar
    const colonia = new Colonia()
    const posicion = { x: 10, y: 5 }
    const colono = new Colono("Juan", colonia, posicion)
    const arbol = new Arbol({ x: 10, y: 10 })

    // ejecutar
    colono.talar(arbol)

    // comprobar
    expect(arbol.durabilidad).toBe(9)
  })

  it("Un colono tala según el daño de su trabajo", () => {
    // preparar
    const colonia = new Colonia()
    const posicion = { x: 10, y: 5 }
    const colono = new Colono("Juan", colonia, posicion)
    const leñador = new Leñador()
    const arbol = new Arbol({ x: 10, y: 10 })

    colono.asignarTrabajo(leñador)

    const durabilidadInicial = arbol.durabilidad
    const daño = leñador.dañoTala

    // ejecutar
    colono.talar(arbol)

    // comprobar
    expect(arbol.durabilidad).toBe(durabilidadInicial - daño)
  })
});