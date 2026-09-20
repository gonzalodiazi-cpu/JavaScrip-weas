import { describe, it, expect, vi } from "vitest";
import { Colonia } from "@src/sociedad/Colonia.js";
import { Leñador } from "@src/sociedad/trabajos/Leñador.js"
import { crearColonia } from "../helpers/crearColonia";

describe("Colonia", () => {
  it("Una colonia se agrega a su mundo al crearse", () => {
    const mundo = {
        agregarColonia: vi.fn()
    }

    const colonia = new Colonia(mundo)

    expect(mundo.agregarColonia).toHaveBeenCalledWith(colonia)
  })
  it("Una colonia pertenece a un mundo", () => {
    const mundo = {
        agregarColonia() {}
    }

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

  //Tests de máquinas

  it("Una colonia comienza con una colección de máquinas", () => {
    const colonia = crearColonia()

    expect(colonia.maquinas).toBeInstanceOf(Set)
  })

  //Tests de colonos
  it("Una colonia comienza con una colección de colonos", () => {
    const colonia = crearColonia()

    expect(colonia.colonos).toBeInstanceOf(Set)
  })
  //Tests de actualizar
  it("Una colonia actualiza sus colonos", () => {
      const colonia = crearColonia()

      const colono = {
          actualizar: vi.fn()
      }

      colonia.agregarColono(colono)
      colonia.actualizar()

      expect(colono.actualizar).toHaveBeenCalled()
  })

  it("Una colonia actualiza sus máquinas", () => {
    const colonia = crearColonia()

    const maquina = {
        actualizar: vi.fn()
    }

    colonia.maquinas.add(maquina)
    colonia.actualizar(2)

    expect(maquina.actualizar).toHaveBeenCalledWith(2)
  })
  //Tests de dibujar
  it("Una colonia recorre sus objetos dibujables", () => {
    const colonia = crearColonia()

    const casa = {}
    const colono = {}

    colonia.casas.set("Casa", casa)
    colonia.colonos.add(colono)

    const accion = vi.fn()

    colonia.paraCadaObjetoDibujable(accion)

    expect(accion).toHaveBeenNthCalledWith(1, casa)
    expect(accion).toHaveBeenNthCalledWith(2, colonia.ayuntamiento)
    expect(accion).toHaveBeenNthCalledWith(3, colono)
  })
});