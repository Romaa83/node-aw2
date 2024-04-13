import { readFile, unlink } from "node:fs";
import { join } from "node:path";
import { mkdir } from "node:fs"; 
import { writeFile } from "node:fs"

//Crear la Carpeta

// const ruta2 = join('./Clase 3/carpeta1')
// mkdir(ruta2,{recursive: true}, (err) => {
//     if (err) throw err;
//   }); 


//Crear el archivo

// readFile('./Clase 3/personas.json', (err, data) => {
//   if (err) throw err;

//   const datos = data.toString();
//   const rutaArchivo = join('./Clase 3/carpeta1/archivo.txt')

//     writeFile(rutaArchivo, datos, (err) => {
//       if (err) throw err;
//       console.log('El archivo se ha creado correctamente.');
//   });
// });

// //Eliminar el archivo

const rutaArchivo = join('./Clase 3/carpeta1/archivo.txt')
unlink (rutaArchivo, (err) =>{
  if (err) throw err
  console.log("el archivo se elimino")
})

  