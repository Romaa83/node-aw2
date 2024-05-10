import http from "node:http"
import fsp from "node:fs/promises"
import path, {parse} from "node:path"
import { url } from "node:inspector"

const puerto = 3000
let productosv1

//FUNCIONES
const leerArchivo = async ()=>{
    try {
        const ruta = path.join('api', 'v1', 'datos.json')
        const archivo = await fsp.readFile(ruta, 'utf-8')
        //console.log(archivo)
        productosv1 = JSON.parse(archivo)
        //console.log(productosv1)
    } catch (error) {
        console.log(error)
    }
}
leerArchivo()


const server = http.createServer((peticion, respuesta)=>{

    const metodo = peticion.method
    const rutaPeticion = peticion.url
    if (metodo === 'GET') {
        //const url = new URL('http://' + peticion.headers.host + rutaPeticion)
        const ruta = parse(rutaPeticion)
        console.log(ruta)
        if (rutaPeticion === '/productos') {
            if(productosv1){
                respuesta.setHeader('Content-Type','application/json')
                respuesta.statusCode = 200
                respuesta.end(JSON.stringify(productosv1))
            }
            else{
                respuesta.statusCode = 404
                respuesta.end("Contenido no encontrado")
            }
        }
        else if (rutaPeticion.match('/productos')) {
            const id = parse(rutaPeticion).base
            console.log(id)
            const datosJson = productosv1.productos.find((productos) => {
                return Number(productos.id) === Number(id)
            })
            //console.log(datosJson)
            const respuestaJson = {
                productos:[datosJson] 
            }
            respuesta.end(JSON.stringify(respuestaJson))
        }
        //
    }
    else if (metodo === "POST") {
        let datos = '';
        peticion.on('data', (pedacitos)=>{
            datos += pedacitos
        })
        peticion.on('error', (error)=>{
            respuesta.statusCode= 404
            respuesta.end('error')
            console.log("error")
        })
        peticion.on('end', async ()=>{
            const rutaJSON = path.join('api', 'v1', 'datos.json')
            const nuevoProducto = JSON.parse(datos)
            productosv1.productos.push(nuevoProducto)
            await fsp.writeFile(rutaJSON, json.stringify(productosv1))
            respuesta.end()
        })
    }
    else{
        respuesta.setHeader('Content-Type','text/plain')
        respuesta.statusCode = 404
        respuesta.end('god')
    }
})

server.listen(puerto)