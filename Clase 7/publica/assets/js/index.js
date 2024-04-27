console.log("Hola")

document.addEventListener("DOMContentLoaded", function() {
    const contenedor = document.getElementById("div-productos");
    let contenido = "";
    fetch('http://localhost:3000/productos').then(response => response.json())
    .then(data => {
        data.forEach(producto => {
            contenido += `<ul>
                        <il>${producto.Nombre}<il>
                        <il>${producto.Dni}<il>
                        </ul>`
        });
        contenedor.innerHTML = contenido
    });
});



