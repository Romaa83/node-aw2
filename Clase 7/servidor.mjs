import http from "node:http"
import fsp from "node:fs/promises"
import path from "node:path"

async function gesIndex(peticion, respuesta){
    try{
        const archivo = await fsp.readFile(path.join('publica', 'index.html'))
        respuesta.statusCode = 200
        respuesta.end(archivo)
    }
    catch (err){
        respuesta.statusCode = 404
        respuesta.end('ASDADS',err)
    }
}

async function gesRecursos(peticion, respuesta){
    try{
        
        //const rutaRecurso = path.join("publica", peticion.url)
        const archivo = await fsp.readFile(path.join('publica', peticion.url))
        respuesta.statusCode = 200
        //respuesta.setHeader('Content-Type','image/jpeg')
        respuesta.end(archivo)
    }
    catch (err){
        respuesta.statusCode = 404
        respuesta.end('eRROR',err)
    }
}

const Servidor = http.createServer((peticion,respuesta)=>{
    if (peticion.method === "GET") {
        if (peticion.url === '/' || peticion.url === '/index.html') {
            gesIndex(peticion, respuesta)
         }
         else{
            gesRecursos(peticion, respuesta)
         }
          //return;
    }
})
Servidor.listen(3000)