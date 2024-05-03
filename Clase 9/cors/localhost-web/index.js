// function enviarDatos(){
//     const nombre = document.getElementById("id-nombre").value;
//     const dni = document.getElementById("id-dni").value;

//     let datos = {
//         "nombre": nombre,
//         "dni": dni
//     }

//     let datosJson = JSON.stringify(datos)
//     console.log(datosJson)
// }
// enviarDatos()

const formulario = document.getElementById("formulario")

formulario.addEventListener('submit', (evt)=>{
    evt.preventDefault()
    //Toma datos del formulario y guarda
    const datos = new FormData(formulario)
    //Toma los datos en formato distinto y los convierte
    const DatosFormulario = Object.fromEntries(datos)
    //console.log(DatosFormulario)

    fetch(formulario.action,{
        method:formulario.method,
        headers:{
            'content-Type':'application/json'
        },
        body:JSON.stringify(DatosFormulario)
    }).then((respuesta)=>{
        console.log(respuesta)
    }).catch((error)=>{
        console.log(error)
    })
})