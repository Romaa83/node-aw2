import express from "express"

const server = express()

const general = express.Router()
const autenticacion = express.Router()

server.use(general, autenticacion)

general.get('/',(peticion, respuesta)=>{
    respuesta.send("ruta general")
})

autenticacion.get('/login', (peticion, respuesta)=>{
    respuesta.send("ruta autenticacion")
})

server.listen(3000)