//console.log("HOLA")
import express from "express"
import ruta from "./ruta/ruta.mjs"
import pg from 'pg'

const {Pool} = pg; 
const pool = new Pool({
    host: 'localhost',
    port: 5432,
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
    const respuesta = await pool.query('select * from productos')
    console.log(respuesta.rows)
    res.json(respuesta.rows)
})

app.get("/productos/:id", async (req, res)=>{
    const {id} = req.params
    const respuesta = await pool.query(`select * from productos where id=${id}`)
    res.json(respuesta.rows)
})

app.post("/productos", async (req, res)=>{
    const respuesta = await pool.query("INSERT INTO productos (producto, precio)" + " VALUES ($1,$2)",["hola",200])
    res.json(respuesta.rows)
})

app.delete("/productos/:id", async(req, res)=>{
    const {id} = req.params
    const respuesta = await pool.query(`DELETE FROM productos WHERE id=${id}`)
    res.json(respuesta.rows)
})