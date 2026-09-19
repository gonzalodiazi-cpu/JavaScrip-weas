export class GestorImagenes {
    constructor() {
        this.imagenes = new Map()

        this.cargar("Arbol_etapa_1", "./assets/Arbol_etapa_1.png")
        this.cargar("Arbol_etapa_2", "./assets/Arbol_etapa_2.png")
        this.cargar("Arbol_etapa_3", "./assets/Arbol_etapa_3.png")
        this.cargar("Colono", "./assets/Colono.png")
        this.cargar("Leñador", "./assets/Leñador.png")
        this.cargar("Madera", "./assets/Madera.png")
        this.cargar("Casa", "./assets/Casa.png")
        this.cargar("Casa_Construccion", "./assets/Casa_Construccion.png")
        
        this.cargar("Ayuntamiento", "./assets/Ayuntamiento.png")
        this.cargar("Colono_con_Hacha", "./assets/Colono_con_Hacha.png")
        this.cargar("Leñador_con_Hacha", "./assets/Leñador_con_Hacha.png")
    }

    cargar(nombre, ruta) {
        const imagen = new Image()
        imagen.src = ruta
        this.imagenes.set(nombre, imagen)
    }

    obtener(nombre) {
        return this.imagenes.get(nombre)
    }
}