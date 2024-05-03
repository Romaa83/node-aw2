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
    // if(peticion.method === "GET"){
    //     if (peticion.url === "/"){
    //         respuesta.end()
    //     }
    //     else if(peticion.url === "/datos"){
    //      GestionarJSON(peticion,respuesta)
    //     }
    // }
     if (peticion.method === "OPTIONS" && peticion.url === '/procesar-formulario'){
        respuesta.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        })
        console.log('se ejecuta el preflight')
        respuesta.statusCode(200)
        respuesta.end()
     }
     else if (peticion.method==="POST" && peticion.url === '/procesar-formulario') {
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
    
})

server.listen(puerto)