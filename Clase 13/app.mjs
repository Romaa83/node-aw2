//console.log("HOLA")
import express from "express"
import ruta from "./ruta/ruta.mjs"
import pg from 'pg'

const {Pool} = pg; 
const pool = new Pool({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'tienda',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

const app = express()

const PUERTO = 3000

app.listen(PUERTO, ()=>{
    //console.log("Servidor")
})

app.get("/productos", async (req, res)=>{
    // const respuesta = await pool.query('select * from productos')
    // console.log(respuesta)
    res.send('postgres')
})