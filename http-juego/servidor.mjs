/*
Programar un guego
"Obtener la frase secreta"

LOGICA DE JUEGO

En un tablero de coordenadas con filas (Letras) y columnas (numeros) de 5 X 5
Se esconden 3 llaves y 3 puertas que cada grupo asignará en las celdas.
No puede haber una llave en la misma celda que la puerta.
Una vez abiertas las puertas se descubrirá la palabra secreta

---

El juego consiste en, a traves de peticiones GET
con la ruta de la coordenada, por ejemplo /A2,
encontrar las 3 llaves para poder abrir las puertas.
Las puertas solo se abren si la llave de esa puerta es encontrada
y se podrán aprir con peticiones POST y la coordenada.
(almacenar en variables si la llave fue encontrada y la puerta encontrada)

Una vez abiertas las 3 puertas, se podrá acceder a la palabra oculta
a traves de la ruta /frase con el metodo GET.

Códigos de estado:

Llave encontrada 200 OK
Coordenada vacía 404 Not Found
Puerta abierta 200 OK
Puerta sin llav3 403 Forbidden
Frase encontrada 200 OK
Frase oculta 403 Forbidden


No hay turnos, el grupo que habra las tres puertas y obtenga la palabra oculta.
Gana.

uso de curl:
> curl --request GET localhost:3000/A1
> curl --request POST localhost:3000/F3


// ****************************************
Agregando nivel de dificultad:

Las llaves y las puertas estarán destibuídas y mezcladas entre varios métodos: GET, POST, PUT, PATCH, DELETE
Las coordenadas de un método son invisibles en otro, es decir, si existe una puerta en GET /A5,
y hacemos la petición POST /A5, devolverá vacío en el caso de que en POST /A5 no exista nada.

// ****************************************

*/

import http from 'node:http';
import express from "express"

// const llaves = {
//     L1: false,
//     L2: false,
//     L3: false,
// };
// const puertas = {
//     P1: false,
//     P2: false,
//     P3: false,
// };

const server = express()
const llaves = {
    L1: false,
    L2: false,
    L3: false,
};
const puertas = {
    P1: false,
    P2: false,
    P3: false,
};
server.get('/frase', (peticion, respuesta)=>{
    if (puertas.P1 && puertas.P2 && puertas.P3) {
        respuesta.send("mi frase secreta")
    }
    else{
        respuesta.send("Las puertas tan cerradas man")
    }
})
server.get('/:coordenada', (peticion, respuesta)=>{
    const {coordenada} = peticion.params
    if (coordenada === "/AIO883") {
        L1 = true
        respuesta.send("Desbloqueada la llave 1")
    }
    else if (coordenada === "/KIOO123") {
        L2 = true
        respuesta.send("Desbloqueada la llave 2")
    }
    else if (coordenada === "/SFAFA232") {
        L3 = true
        respuesta.send("Desbloqueada la llave 2")
    }
    else {
        respuesta.send("Nada")
    }
})
server.post('/:coordenada', (peticion, respuesta)=>{
    const {coordenada} = peticion.params
    if (coordenada === "/AIO883") {
        if (L1) {
            P1 = true
            respuesta.send("Abriste la puerta 1")
        }
        else{
            respuesta.send("Flaco no tenes la llave")
        }
    }
    else if (coordenada === "/KIOO123") {
        if (L2) {
            P2 = true
        }
        else{
            respuesta.send("Flaco no tenes la llave")
        }
    }
    else if (coordenada === "/SFAFA232") {
        if (L3) {
            P3 = true
        }
        else{
            respuesta.send("Flaco no tenes la llave")
        }
    }
    else{
        respuesta.send("No")
    }
})

const servidor = http.createServer((peticion, respuesta) => {
    if (peticion.method === 'GET') {
        if (peticion.url === '/frase') {
            if (puertas.P1 && puertas.P2 && puertas.P3) {
                respuesta.statusCode = 200;
                respuesta.end('Mi frase secreta');
                return;
            } else {
                respuesta.statusCode = 403;
                respuesta.end('Las puertas no se han abierto');
                return;
            }
        }
        // Coordenadas de las llaves
        // Llave 1
        if (peticion.url === '/B2') {
            respuesta.statusCode = 200;
            llaves.L1 = true;
            respuesta.end('Encontrada Llave 1');
            return;
        }
        // Llave 2
        if (peticion.url === '/B4') {
            respuesta.statusCode = 200;
            llaves.L2 = true;
            respuesta.end('Encontrada Llave 2');
            return;
        }
        // Llave 3
        if (peticion.url === '/E3') {
            respuesta.statusCode = 200;
            llaves.L3 = true;
            respuesta.end('Encontrada Llave 3');
            return;
        }
        respuesta.statusCode = 404;
        respuesta.end('Lugar vacío');
        return;
    }
    if (peticion.method === 'POST') {
        // Coordenadas de las llaves
        // Llave 1
        if (peticion.url === '/F1') {
            if (llaves.L1) {
                respuesta.statusCode = 200;
                puertas.P1 = true;
                respuesta.end('Abierta puerta 1');
                return;
            } else {
                respuesta.statusCode = 403;
                respuesta.end('No tiene la llave');
                return;
            }
        }
        // Llave 2
        if (peticion.url === '/A1') {
            if (llaves.L2) {
                respuesta.statusCode = 200;
                puertas.P2 = true;
                respuesta.end('Abierta puerta 2');
                return;
            } else {
                respuesta.statusCode = 403;
                respuesta.end('No tiene la llave');
                return;
            }
        }
        // Llave 3
        if (peticion.url === '/C3') {
            if (llaves.L3) {
                respuesta.statusCode = 200;
                puertas.P3 = true;
                respuesta.end('Abierta puerta 3');
                return;
            } else {
                respuesta.statusCode = 403;
                respuesta.end('No tiene la llave');
                return;
            }
        }
        respuesta.statusCode = 404;
        respuesta.end('Lugar vacío');
        return;
    }
    respuesta.statusCode = 404;
    respuesta.end('Faltan datos');
});
servidor.listen(3000);
