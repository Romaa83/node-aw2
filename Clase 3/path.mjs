//Rutas 
import {sep,join,parse} from "node:path"

//construir ruta
const ruta = join('a','b','c','productos.json')
console.log(ruta)

const rutaDesglo = parse(ruta)
console.log(rutaDesglo)