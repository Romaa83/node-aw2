const json = async () => {
    try{
        const datos = await fetch("http://localhost:3000/datos")
        const datosJson = await datos.json()
        console.log(datosJson)
    }
    catch(error){
        console.error(error)
    }
}

json()