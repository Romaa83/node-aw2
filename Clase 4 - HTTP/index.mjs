import http from "node:http"

const Servidor = http.createServer((peticion,respuesta)=>{
    //console.log(peticion);
    const ruta = peticion.url;
    const metodo = peticion.method
    if (metodo === 'GET' && ruta === "/") {
        respuesta.setHeader('Content-Type','text/plan')
        respuesta.statusCode = 200;
        respuesta.end('<h1>No<h1>')
        return;
    }
    else {
        respuesta.statusCode = 404;
        respuesta.end('No encontrada')
    }
    // if (ruta === "/") {
    // respuesta.end(`La ruta es: ${ruta}` +`metodo ${metodo}` );
    // }
    // else if (ruta === "/saludo") {
    //     respuesta.end(`Saludos ${ruta}`)
    // }
    // else {respuesta.end(`error ${ruta}`)}
});
Servidor.listen(3000)