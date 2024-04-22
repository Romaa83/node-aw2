import http from "node:http"
import fsp from "node:fs/promises"
import path from "node:path"
import fs from "node:fs"

const ruta = path.join("publica" , "index.html")
// const imagen = path.join("publica", "assets", "img", "pexels-pixabay-462023.jpg")

async function gesIndex(peticion, respuesta){
    try{
        const archivo = await fsp.readFile(path.join("publica", "index.html"))
        respuesta.end(archivo)
    }
    catch (err){
        respuesta.end(err)
    }

}

async function gesRecursos(peticion, respuesta){
    try{
        
        const rutaRecurso = path.join("publica", peticion.url)
        const archivo = await fsp.readFile(rutaRecurso)
        respuesta.end(archivo)
    }
    catch (err){
        respuesta.end(err)
    }
}



const Servidor = http.createServer((peticion,respuesta)=>{
    if (peticion.method === "GET") {
        if (peticion.url === "/") {
            gesIndex(peticion, respuesta)
         }
         else{
            gesRecursos(peticion, respuesta)
         }
         return;
    }
    else{
        
    }
})
Servidor.listen(3000)