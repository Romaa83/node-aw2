import express from "express"

const server = express()

const general = express.Router()
const autenticacion = express.Router()

server.get("/productos/:id_producto",(peticion, respuesta)=>{
    const id_producto = peticion.params.id_producto
    respuesta.send("El id es:" + id_producto)
})
server.get("/productos/:id_producto/colores/:id_color",(peticion, respuesta)=>{
    // const id_producto = peticion.params.id_producto
    // const id_color = peticion.params.id_color
    const {id_producto, id_color} = peticion.params
    console.log()
    respuesta.send("El id es: " + id_producto + " Y color: " + id_color)
})
server.listen(3000)