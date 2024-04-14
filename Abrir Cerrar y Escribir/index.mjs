import { datos } from "./datos.mjs";
import fs from 'fs/promises'


const archivo = './Abrir Cerrar y Escribir/miarchivo.txt';
async function escribir(){
    let fd
    fd = await fs.open(archivo, 'w')
    await fs.writeFile(fd, datos)
}

escribir()