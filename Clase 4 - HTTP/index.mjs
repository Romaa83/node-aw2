import http from "node:http"

const Servidor = http.createServer((peticion,respuesta)=>{
    //console.log(peticion);
    const ruta = peticion.url;
    const metodo = peticion.method
    if (metodo === 'GET' && ruta === "/") {
        respuesta.end('<h1>Si<h1>')
        return;
    }
    else {
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