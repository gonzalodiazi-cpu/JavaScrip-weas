import { describe, it, expect } from "vitest";
import { Colonia } from "@src/sociedad/Colonia.js";
import { Colono } from "@src/sociedad/Colono.js";
import { Desempleado } from "@src/sociedad/trabajos/Desempleado.js";
import { Arbol } from "@src/mundo/Arbol.js";
import { Leñador } from "@src/sociedad/trabajos/Leñador.js";
import { crearColonia } from "../helpers/crearColonia";
import { crearColono } from "../helpers/crearColono";
import { Recurso } from "../../src/mundo/Recurso";

describe("Colono", () => {
  it("Un colono tiene una posición al ser creado", () => {
    const colonia = crearColonia();
    const posicion = { x: 10, y: 5 };

    const colono = new Colono("Juan", colonia, posicion);

    expect(colono.posicion).toEqual(posicion);
  });
  it("Un colono nuevo comienza desempleado", () => {
  // preparar
    const colonia = crearColonia()
    const posicion = { x: 10, y: 5 }

  // ejecutar
    const colono = new Colono("Juan", colonia, posicion)

  // comprobar
    expect(colono.trabajo).toBeInstanceOf(Desempleado)
  })
  
  it("Un colono comienza con el trabajo desempleado de su colonia", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    expect(colono.trabajo).toBe(colonia.desempleado)
  })

  it("Las estadísticas del colono consideran la base actual de su colonia", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colonia.estadisticasBaseColono.velocidad = 2

    expect(colono.velocidad).toBe(2)
  })


  it("Un colono puede cambiar de trabajo", () => {
    // preparar
    const colonia = crearColonia()
    const posicion = { x: 10, y: 5 }
    const colono = new Colono("Juan", colonia, posicion)
    const nuevoTrabajo = colonia.leñador
    // ejecutar
    colono.asignarTrabajo(nuevoTrabajo)

    // comprobar
    expect(colono.trabajo).toBe(nuevoTrabajo)
  })

  it("las estadísticas del colono consideran el modificador de velocidad de su trabajo", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colonia.estadisticasBaseColono.velocidad = 2
    colonia.leñador.modificadorVelocidad = 0.5

    colono.asignarTrabajo(colonia.leñador)

    expect(colono.velocidad).toBe(2.5)
  })

  it("Un colono puede talar un árbol", () => {
    // preparar
    const colonia = crearColonia()
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
      const colonia = crearColonia()
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
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.avanzarHacia({ x: 10, y: 0 })

    expect(colono.posicion).toEqual({ x: 1, y: 0 })
  })
  it("Un colono cambia su velocidad al cambiar de trabajo", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.asignarTrabajo(colonia.leñador)

    expect(colono.velocidad).toBe(
        colonia.estadisticasBaseColono.velocidad +
        colonia.leñador.modificadorVelocidad
    )
  })
  it("Un colono llega exactamente al destino si está más cerca que su velocidad", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.avanzarHacia({ x: 0.5, y: 0 })

    expect(colono.posicion).toEqual({ x: 0.5, y: 0 })
  })
  it("Un colono puede establecer una posición como destino", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })
    const destino = { x: 10, y: 5 }

    colono.establecerDestino(destino)

    expect(colono.destino).toEqual(destino)
  })
  it("Un colono actualiza su movimiento hacia su destino", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.establecerDestino({ x: 10, y: 0 })

    colono.actualizarMovimiento()

    expect(colono.posicion).toEqual({ x: 1, y: 0 })
  })
  it("Un colono deja de tener destino al llegar a él", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.establecerDestino({ x: 1, y: 0 })

    colono.actualizarMovimiento()

    expect(colono.posicion).toEqual({ x: 1, y: 0 })
    expect(colono.destino).toBeNull()
  })
  it("Un colono puede buscar un objeto y establecerlo como destino", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })
    const arbol = new Arbol({ x: 10, y: 20 })

    colono.buscar(arbol)

    expect(colono.destino).toEqual(arbol.posicion)
  })
  it("busca el objeto más cercano", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    const arbolLejano = new Arbol({ x: 20, y: 0 })
    const arbolCercano = new Arbol({ x: 5, y: 0 })

    colono.buscarOptimo([arbolLejano, arbolCercano])

    expect(colono.destino).toEqual(arbolCercano.posicion)
  })
  it("puede talar un árbol cuando está en la misma posición", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 10, y: 20 })
    const arbol = new Arbol({ x: 10, y: 20 })
    
    const durabilidadInicial = arbol.durabilidad
    colono.talar(arbol)

    expect(arbol.durabilidad).toBe(durabilidadInicial-colono.dañoTala)
  })
  it("no puede talar un árbol cuando no está en la misma posición", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 10, y: 20 })
    const arbol = new Arbol({ x: 15, y: 20 })
    const durabilidadInicial = arbol.durabilidad
    colono.talar(arbol)
    expect(arbol.durabilidad).toBe(durabilidadInicial)
  })
  it("un colono puede elegir un árbol disponible para talar", () => {
    const mundo = {
        arboles: [
            new Arbol({ x: 20, y: 0 }),
            new Arbol({ x: 5, y: 0 })
        ]
    }

    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.talarArboles()

    expect(colono.objetivo).toBe(mundo.arboles[1])
  })
  it("Un árbol elegido para talar queda reservado para ese colono", () => {
    const mundo = {
        arboles: [
            new Arbol({ x: 5, y: 0 }),
            new Arbol({ x: 10, y: 0 })
        ]
    }

    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.talarArboles()

    expect(mundo.arboles[0].talador).toBe(colono)
  })
  it("Un colono no elige un árbol que ya está siendo talado por otro colono", () => {
    const mundo = {
        arboles: [
            new Arbol({ x: 5, y: 0 }),
            new Arbol({ x: 10, y: 0 })
        ]
    }

    const colonia = new Colonia(mundo)

    const colono1 = new Colono("Juan", colonia, { x: 0, y: 0 })
    const colono2 = new Colono("Pedro", colonia, { x: 0, y: 0 })

    colono1.talarArboles()
    colono2.talarArboles()

    expect(colono1.objetivo).toBe(mundo.arboles[0])
    expect(colono2.objetivo).toBe(mundo.arboles[1])
  })
  it("un colono con un árbol asignado no busca otro árbol", () => {
    const mundo = {
        arboles: [
            new Arbol({ x: 5, y: 0 }),
            new Arbol({ x: 10, y: 0 })
        ]
    }

    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.talarArboles()
    const objetivo = colono.objetivo

    colono.talarArboles()

    expect(colono.objetivo).toBe(objetivo)
  })
  it("Un colono tala su árbol objetivo cuando llega a él", () => {
    const arbol = new Arbol({ x: 0, y: 0 })
    const mundo = { arboles: [arbol] }
    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.talarArboles()

    const durabilidadInicial = arbol.durabilidad

    colono.talarArboles()

    expect(arbol.durabilidad).toBe(
        durabilidadInicial - colono.dañoTala
    )
  })

  it("Un colono se mueve hacia su árbol objetivo y luego lo tala", () => {
    const arbol = new Arbol({ x: 1, y: 0 })
    const mundo = { arboles: [arbol] }
    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.talarArboles()

    const durabilidadInicial = arbol.durabilidad

    colono.actualizarMovimiento()
    colono.talarArboles()

    expect(colono.posicion).toEqual({ x: 1, y: 0 })
    expect(arbol.durabilidad).toBe(
        durabilidadInicial - colono.dañoTala
    )
  })

  it("Un colono libera su árbol objetivo cuando lo tala", () => {
    const arbol = new Arbol({ x: 0, y: 0 })
    arbol.durabilidad = 1

    const mundo = { arboles: [arbol] }
    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.talarArboles()
    colono.talarArboles()

    expect(arbol.talado).toBe(true)
    expect(colono.objetivo).toBeNull()
    expect(arbol.talador).toBeNull()
  })
  it("Un colono ejecuta su actividad al actualizarse", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    let ejecutada = false
    colono.actividad = () => {
        ejecutada = true
    }

    colono.actualizar()

    expect(ejecutada).toBe(true)
  })
  it("un colono ejecuta talarArboles cuando esa es su actividad", () => {
    const arbol = new Arbol({ x: 0, y: 0 })
    const mundo = { arboles: [arbol] }
    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.actividad = colono.talarArboles

    colono.actualizar()

    expect(colono.objetivo).toBe(arbol)
  })
  it("Un colono tiene una imagen según su trabajo", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    expect(colono.imagen).toBe("Colono")

    colono.asignarTrabajo(colonia.leñador)

    expect(colono.imagen).toBe("Leñador")
  })
  it("El inventario de un colono refleja sus estadísticas actuales", () => {
    const colonia = crearColonia()
    const colono = new Colono("Ivan", colonia, { x: 0, y: 0 })

    colonia.estadisticasBaseColono.cantidadSlotsInventario = 7
    colonia.estadisticasBaseColono.capacidadSlotsInventario = 20

    expect(colono.inventario.cantidadSlotsInventario).toBe(7)
    expect(colono.inventario.capacidadSlotsInventario).toBe(20)
  })
  it("Un colono guarda un recurso cuando está en su misma posición", () => {
    const colono = crearColono()
    const recurso = new Recurso("Madera", 8, colono.posicion)

    colono.recoger(recurso)

    expect(colono.inventario.recursos.get("Madera")).toBe(8)
  })
  it("Un colono elige un recurso del tipo que está buscando", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, {x: 0, y: 0})

    const madera = new Recurso("Madera", 10, {x: 100, y: 0})
    const piedra = new Recurso("Piedra", 10, {x: 50, y: 0})

    colonia.mundo.agregarRecurso(madera)
    colonia.mundo.agregarRecurso(piedra)

    colono.recogerRecursos("Madera")

    expect(colono.objetivo).toBe(madera)
  })
  it("Un colono puede elegir un recurso disponible para recoger", () => {
    const recurso = new Recurso("Madera", 8, { x: 10, y: 0 })
    const mundo = { recursos: [recurso] }
    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.recogerRecursos()

    expect(colono.objetivo).toBe(recurso)
  })
  it("Un recurso elegido para recoger queda reservado para ese colono", () => {
    const recurso = new Recurso("Madera", 8, { x: 10, y: 0 })
    const mundo = { recursos: [recurso] }
    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.recogerRecursos()

    expect(recurso.recogedor).toBe(colono)
  })
  it("Un colono no elige un recurso que ya está siendo recogido por otro colono", () => {
    const recurso1 = new Recurso("Madera", 8, { x: 5, y: 0 })
    const recurso2 = new Recurso("Madera", 8, { x: 10, y: 0 })
    const mundo = { recursos: [recurso1, recurso2] }
    const colonia = new Colonia(mundo)

    const colono1 = new Colono("Juan", colonia, { x: 0, y: 0 })
    const colono2 = new Colono("Pedro", colonia, { x: 0, y: 0 })

    colono1.recogerRecursos()
    colono2.recogerRecursos()

    expect(colono1.objetivo).toBe(recurso1)
    expect(colono2.objetivo).toBe(recurso2)
  })
  it("Un colono recoge su recurso objetivo cuando llega a él", () => {
    const recurso = new Recurso("Madera", 8, { x: 0, y: 0 })
    const mundo = { recursos: [recurso] }
    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.recogerRecursos()
    colono.recogerRecursos()

    expect(colono.inventario.recursos.get("Madera")).toBe(8)
  })
  it("Un colono libera su recurso objetivo cuando lo recoge completamente", () => {
    const recurso = new Recurso("Madera", 8, { x: 0, y: 0 })
    const mundo = { recursos: [recurso] }
    const colonia = new Colonia(mundo)
    const colono = new Colono("Juan", colonia, { x: 0, y: 0 })

    colono.recogerRecursos()
    colono.recogerRecursos()

    expect(recurso.recogedor).toBeNull()
    expect(colono.objetivo).toBeNull()
  })
  it("Un colono va al ayuntamiento cuando no puede recoger más madera", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, {x: 0, y: 0})

    colono.inventario.agregar(
        new Recurso("Madera", 50, {x: 0, y: 0})
    )

    const madera = new Recurso("Madera", 10, {x: 100, y: 0})
    colonia.mundo.agregarRecurso(madera)

    colono.recogerRecursos("Madera")

    expect(colono.destino).toBe(colonia.ayuntamiento.posicion)
  })
  it("Un colono deposita su madera al llegar al ayuntamiento", () => {
    const colonia = crearColonia()
    const colono = new Colono(
        "Juan",
        colonia,
        colonia.ayuntamiento.posicion
    )

    const recurso = new Recurso("Madera", 10, {x: 0, y: 0})
    colono.inventario.agregar(recurso)

    colono.recogerRecursos("Madera")

    expect(colonia.madera).toBe(10)
    expect(colono.inventario.recursos.has("Madera")).toBe(false)
  })
  it("Un colono vuelve a buscar madera después de depositarla", () => {
    const colonia = crearColonia()
    const colono = new Colono(
        "Juan",
        colonia,
        colonia.ayuntamiento.posicion
    )

    const maderaInventario = new Recurso("Madera", 10, {x: 0, y: 0})
    colono.inventario.agregar(maderaInventario)

    const maderaDisponible = new Recurso("Madera", 10, {x: 100, y: 0})
    colonia.mundo.agregarRecurso(maderaDisponible)

    colono.recogerRecursos("Madera")

    expect(colono.objetivo).toBe(maderaDisponible)
    expect(colono.destino).toBe(maderaDisponible.posicion)
  })
  it("Un colono termina la actividad cuando no queda madera en el mundo ni en su inventario", () => {
    const colonia = crearColonia()
    const colono = new Colono(
        "Juan",
        colonia,
        colonia.ayuntamiento.posicion
    )

    colono.actividad = colono.recogerRecursos

    colono.recogerRecursos("Madera")

    expect(colono.inventario.recursos.has("Madera")).toBe(false)
    expect(colono.actividad).toBe(null)
  })
  it("Un colono va al ayuntamiento cuando no queda madera en el mundo pero tiene madera en su inventario", () => {
    const colonia = crearColonia()
    const colono = new Colono(
        "Juan",
        colonia,
        {x: 0, y: 0}
    )

    const madera = new Recurso("Madera", 10, {x: 0, y: 0})
    colono.inventario.agregar(madera)

    colono.recogerRecursos("Madera")

    expect(colono.destino).toBe(colonia.ayuntamiento.posicion)
  })
  it("Un colono termina la actividad cuando no queda madera ni en el mundo ni en su inventario", () => {
    const colonia = crearColonia()
    const colono = new Colono(
        "Juan",
        colonia,
        {x: 0, y: 0}
    )

    colono.actividad = colono.recogerRecursos

    colono.recogerRecursos("Madera")

    expect(colono.actividad).toBe(null)
  })
  it("Un colono va al ayuntamiento cuando llena su inventario al recoger madera", () => {
    const colonia = crearColonia()
    const colono = new Colono("Juan", colonia, {x: 0, y: 0})

    const maderaInicial = new Recurso("Madera", 45, {x: 0, y: 0})
    colono.inventario.agregar(maderaInicial)

    const madera = new Recurso("Madera", 10, {x: 0, y: 0})
    colonia.mundo.agregarRecurso(madera)

    colono.recogerRecursos("Madera")
    colono.recogerRecursos("Madera")

    expect(colono.inventario.recursos.get("Madera")).toBe(50)
    expect(colono.destino).toBe(colonia.ayuntamiento.posicion)
  })

});