import http from "node:http"
import {readFile} from "node:fs/promises"
import path from "node:path"
import fs from "node:fs"

 const ruta = path.join("publica", "index.html")
//  console.log(ruta)
// const procesar = (peticion) => {
//         if (peticion.url === "/") {
            
//         }
// }
const Servidor = http.createServer((peticion,respuesta)=>{
     if (peticion.url === "/" && peticion.method ==="GET") {
        fs.readFile(ruta, (err, datos) => {
            respuesta.end(datos)
        })
     }
})
Servidor.listen(3000)

