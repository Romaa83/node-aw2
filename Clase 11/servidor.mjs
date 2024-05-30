import express from 'express'

const PUERTO = 3000
const server = express()

server.use(express.static("front"))

// const middleware1 = (peticion, respuesta, next)=>{
//     console.log("Hola midelware")
//     next()
// }

// server.get("/", middleware1,(peticion, respuesta)=>{
//     respuesta.send("hola get")
// })
// server.get('/productos',(peticion, respuesta)=>{
//     respuesta.set('Content-Type','text/html;charset=utf-8')
//     respuesta.send("hola producto")
// })
// server.post("/",(peticion, respuesta)=>{
//     respuesta.send('POST')
// })

server.listen(PUERTO)