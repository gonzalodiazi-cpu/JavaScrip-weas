import { crearColonia } from "./crearColonia";
import { Colono } from "../../src/sociedad/Colono";
export function crearColono() {
    const colonia = crearColonia()
    const colono = new Colono("Zalo", colonia, {x:67,y:67})
    return colono
}