//http, fs, path
import http, { METHODS } from "node:http"
import fsp from "node:fs/promises"
import path from "node:path"

let puerto = 3000

async function GestionarJSON(peticion,respuesta){
    try{
        const ruta = path.join("datos.json")
        const archivo = await fsp.readFile(ruta)
        respuesta.setHeader('Access-Control-Allow-Origin','*')
        respuesta.setHeader('Cache-Control','max-age=3600')
        respuesta.setHeader('Content-Type','text/html;charset=utf-8')
        respuesta.end(archivo)
    }
    catch(err){
        respuesta.end("error")
    }
}

const server = http.createServer((peticion, respuesta)=>{
    if(peticion.method === "GET"){
        if(peticion.url === "/datos"){
         GestionarJSON(peticion,respuesta)
        }
    }
})

server.listen(puerto)