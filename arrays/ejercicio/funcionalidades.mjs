//Map cambio de precio
//Filter Productos stock mayor a 20
import productosLimpieza from "./limpieza.mjs";

const MapLimpieza = productosLimpieza.map((productos)=>{
    //  productos.precio = productos.precio + (productos.precio * 0.1)
    //  productos.precio = productos.precio.toFixed(2)
     return{
        nombre: productos.nombre,
        precio: productos.precio += (productos.precio * 0,1),
        stock: productos.stock,
     }
})


const FilterLimpieza = productosLimpieza.filter((productos)=>{
    return(productos.stock > 50)  
})

export {MapLimpieza, FilterLimpieza}
