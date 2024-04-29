import http from "node:http"
import fsp from "node:fs/promises"
import path from "node:path"

//Diccionario
const mime = {
    '.jpg':'image/jpeg;charset=utf-8',
    '.jpeg':'image/jpeg;charset=utf-8',
    '.png':'image/png;charset=utf-8',
    '.json':'application/json;charset=utf-8',
    '.js':'application/javascript;charset=utf-8',
    '.css':'text/css;charset=utf-8'
}

async function gesIndex(peticion, respuesta){
    try{
        const archivo = await fsp.readFile(path.join('publica', 'index.html'))
        respuesta.statusCode = 200
        respuesta.setHeader('Content-Type','text/html;charset=utf-8')
        respuesta.end(archivo)
    }
    catch (err){
        respuesta.statusCode = 404
        respuesta.setHeader('Content-Type','text/plain;charset=utf-8')
        respuesta.end('ASDADS')
    }
}

async function gesRecursos(peticion, respuesta){
    try{
        const ruta = path.join('publica', peticion.url)
        const extension = path.extname(ruta)
        const extMime = mime[extension]
        const archivo = await fsp.readFile(ruta)
        // respuesta.statusCode = 200
        // respuesta.setHeader('Content-Type',extMime)
        // respuesta.setHeader('cache-control','max-age:3600')
        respuesta.writeHead(200,{
            'Content-Type':extMime,
            'cache-control':'max-age:3600'
        })
        respuesta.end(archivo)
    }
    catch (err){
        respuesta.statusCode = 404
        respuesta.end('error')
    }
}

async function gesJson(peticion,respuesta){
    try{
        const ruta = path.join('publica', 'assets', 'personas.json')
        const archivo = await fsp.readFile(ruta)
        respuesta.setHeader('Content-Type','application/json;charset=utf-8')
        respuesta.end(archivo)
    }
    catch{
        respuesta.setHeader('Content-Type','text/plain;charset=utf-8')
        respuesta.end('error')
    }
}

const Servidor = http.createServer((peticion,respuesta)=>{
    if (peticion.method === "GET") {
        if (peticion.url === '/' || peticion.url === '/index.html') {
            gesIndex(peticion, respuesta)
         }
         else if (peticion.url === "/productos") {
            gesJson(peticion,respuesta)
         }
         else{
            gesRecursos(peticion, respuesta)
         }
    }
    else if(peticion.method==="POST"){
        if (peticion.url === '/procesar-formulario') {
            let datosFormulario = '';

            //legando
            peticion.on('data', (pedacitos)=>{
                datosFormulario += pedacitos
            })
            //hay un error
            peticion.on('error', (error)=>{
                console.error(error)
                respuesta.statusCode = 500
                respuesta.end('error en el servidor')
            })
            //llego
            peticion.on('end',()=>{
                console.log(datosFormulario)
                respuesta.end(datosFormulario)
            })
            //respuesta.end(datosFormulario)
         }
         else if (peticion.url === "/productos") {
            gesJson(peticion,respuesta)
         }
         else{
            gesRecursos(peticion, respuesta)
         }
    }
})
Servidor.listen(3000)