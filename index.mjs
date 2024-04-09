// {}

//Recibe parametros
import {suma} from "./funciones.mjs"

console.log(suma(2,3))

//No recibe parametros
import {si} from "./funciones.mjs"

console.log(si())

//Modulos

import {carrera, materia, obtenerCarrera} from "./modulos.mjs"

console.log(carrera, materia, obtenerCarrera())

//Modulo con export default

import cualquiernombre from "./modulos.mjs"

console.log(cualquiernombre)