import http from "node:http"
import fsp from "node:fs/promises"
import path from "node:path"

const puerto = 3000
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
        const extension = path.extname(ruta)
        const extMime = mime[extension]
        const archivo = await fsp.readFile(ruta)
        respuesta.statusCode = 200
        respuesta.setHeader('Content-Type',extMime)
        respuesta.end(archivo)
    }
    catch(err){
        respuesta.statusCode = 404
        respuesta.end("error")
    }
}

async function escribirJson(peticion,respuesta){
    const ruta = path.join('saludos','saludos.json')
    try {
        await fsp.writeFile(ruta,JSON.stringify(datos))
        respuesta.statusCode= 200
        respuesta.setHeader('Content-Type','application/json')
        respuesta.end("Archivo generado con exito")
    } catch (error) {
            respuesta.statusCode = 404
            respuesta.end('Error al generar el archivo')
    }
}

const datos = {"saludos":["Buenos días","Buenas tardes","Buenas noches"]}

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
            escribirJson(peticion,respuesta)
        }
        else{
            respuesta.end("si")
        }
    }
})

server.listen(puerto)