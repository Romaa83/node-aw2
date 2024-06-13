import express from "express"
import "dotenv/config"
import cors from "cors"
import helmet from "helmet"
import jwt, { TokenExpiredError } from "jsonwebtoken"

const app = express()
const port = process.env.port ?? 3000

app.use(helmet())
//habilitar recepcion
app.use(express.json(), express.urlencoded({extended:true}))


app.use(express.static('www'))
//EN TODAS
//app.use(cors())


//EN una
app.get("/login",(req, res)=>{
    //recibimos datos del usuario

    // res.cookie('materia','aw2',{
    //     secure:true,
    //     httpOnly:true,
    //     sameSite:'strict'
    // })
    // res.end('Login')
})


app.listen(port, ()=>{
    console.log(port)
})