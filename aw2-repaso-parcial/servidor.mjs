import http from "node:http"
import fsp from "node:fs/promises"
import path from "node:path"

const puerto = 3000

async function gesIndex(peticion, respuesta){
    try{
        const ruta = path.join('publica', 'index.html')
        const archivo = await fsp.readFile(ruta)
        respuesta.statusCode = 200
        respuesta.setHeader('Content-Type','text/html;charset=utf-8')
        respuesta.end(archivo)
    }
    catch(err){
        respuesta.statusCode = 404
        respuesta.setHeader('Content-Type','text/plain;charset=utf-8')
        respuesta.end("Error")
    }
}

async function gesRecursos (peticion, respuesta){
    try{
        const ruta = path.join('publica',peticion.url)
        const archivo = await fsp.readFile(ruta)
        respuesta.statusCode = 200
        respuesta.setHeader('.css','text/css;charset=utf-8')
        respuesta.end(archivo)
    }
    catch(err){
        respuesta.statusCode = 404
        respuesta.end("error")
    }
}

const server = http.createServer((peticion, respuesta)=>{
    if (peticion.method === 'GET') {
        if (peticion.url === '/'){
            gesIndex(peticion, respuesta)
        }
        else{
            gesRecursos(peticion, respuesta)
        }
    }
    else if (peticion.method === 'POST') {
        if (peticion.url === '/generar') {
            
        }
        else{
            respuesta.end("si")
        }
    }
})

server.listen(puerto)