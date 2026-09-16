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
  
  it("Un colono comienza con el trabajo desempleado de su colonia", () => {
    const colonia = new Colonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    expect(colono.trabajo).toBe(colonia.desempleado)
  })

  it("Las estadísticas del colono consideran la base actual de su colonia", () => {
    const colonia = new Colonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colonia.estadisticasBaseColono.velocidad = 2

    expect(colono.velocidad).toBe(2)
  })


  it("Un colono puede cambiar de trabajo", () => {
    // preparar
    const colonia = new Colonia()
    const posicion = { x: 10, y: 5 }
    const colono = new Colono("Juan", colonia, posicion)
    const nuevoTrabajo = colonia.leñador
    // ejecutar
    colono.asignarTrabajo(nuevoTrabajo)

    // comprobar
    expect(colono.trabajo).toBe(nuevoTrabajo)
  })

  it("las estadísticas del colono consideran el modificador de velocidad de su trabajo", () => {
    const colonia = new Colonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colonia.estadisticasBaseColono.velocidad = 2
    colonia.leñador.modificadorVelocidad = 0.5

    colono.asignarTrabajo(colonia.leñador)

    expect(colono.velocidad).toBe(2.5)
  })

  it("Un colono puede talar un árbol", () => {
    // preparar
    const colonia = new Colonia()
    const posicion = { x: 10, y: 10 }
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
      const posicion = { x: 10, y: 10 }
      const colono = new Colono("Juan", colonia, posicion)
      const arbol = new Arbol({ x: 10, y: 10 })

      colono.asignarTrabajo(colonia.leñador)

      const durabilidadInicial = arbol.durabilidad
      const daño = colono.dañoTala

      // ejecutar
      colono.talar(arbol)

      // comprobar
      expect(arbol.durabilidad).toBe(durabilidadInicial - daño)
    })

  it("Un colono avanza hacia una posición según su velocidad", () => {
    const colonia = new Colonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.avanzarHacia({ x: 10, y: 0 })

    expect(colono.posicion).toEqual({ x: 1, y: 0 })
  })
  it("Un colono cambia su velocidad al cambiar de trabajo", () => {
    const colonia = new Colonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.asignarTrabajo(colonia.leñador)

    expect(colono.velocidad).toBe(
        colonia.estadisticasBaseColono.velocidad +
        colonia.leñador.modificadorVelocidad
    )
  })
  it("Un colono llega exactamente al destino si está más cerca que su velocidad", () => {
    const colonia = new Colonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.avanzarHacia({ x: 0.5, y: 0 })

    expect(colono.posicion).toEqual({ x: 0.5, y: 0 })
  })
  it("Un colono puede establecer una posición como destino", () => {
    const colonia = new Colonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })
    const destino = { x: 10, y: 5 }

    colono.establecerDestino(destino)

    expect(colono.destino).toEqual(destino)
  })
  it("Un colono actualiza su movimiento hacia su destino", () => {
    const colonia = new Colonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.establecerDestino({ x: 10, y: 0 })

    colono.actualizarMovimiento()

    expect(colono.posicion).toEqual({ x: 1, y: 0 })
  })
  it("Un colono deja de tener destino al llegar a él", () => {
    const colonia = new Colonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.establecerDestino({ x: 1, y: 0 })

    colono.actualizarMovimiento()

    expect(colono.posicion).toEqual({ x: 1, y: 0 })
    expect(colono.destino).toBeNull()
  })
  it("Un colono puede buscar un objeto y establecerlo como destino", () => {
    const colonia = new Colonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })
    const arbol = new Arbol({ x: 10, y: 20 })

    colono.buscar(arbol)

    expect(colono.destino).toEqual(arbol.posicion)
  })
  it("busca el objeto más cercano", () => {
    const colonia = new Colonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    const arbolLejano = new Arbol({ x: 20, y: 0 })
    const arbolCercano = new Arbol({ x: 5, y: 0 })

    colono.buscarOptimo([arbolLejano, arbolCercano])

    expect(colono.destino).toEqual(arbolCercano.posicion)
  })
  it("puede talar un árbol cuando está en la misma posición", () => {
    const colonia = new Colonia()
    const colono = new Colono("Juan", colonia, { x: 10, y: 20 })
    const arbol = new Arbol({ x: 10, y: 20 })
    
    const durabilidadInicial = arbol.durabilidad
    colono.talar(arbol)

    expect(arbol.durabilidad).toBe(durabilidadInicial-colono.dañoTala)
  })
  it("no puede talar un árbol cuando no está en la misma posición", () => {
    const colonia = new Colonia()
    const colono = new Colono("Juan", colonia, { x: 10, y: 20 })
    const arbol = new Arbol({ x: 15, y: 20 })
    const durabilidadInicial = arbol.durabilidad
    colono.talar(arbol)
    expect(arbol.durabilidad).toBe(durabilidadInicial)
  })
});