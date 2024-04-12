import { readFile } from "node:fs";
import { join } from "node:path";
import { mkdir } from "node:fs"; 

// readFile('si.txt', (err,data) => {
//     if (err) throw err
//     console.log(data.toString())
// })

const ruta2 = join('carpeta1', "carpeta2")
mkdir(ruta2,{recursive: true}, (err) => {
    if (err) throw err;
  }); 