console.log("Hola")

fetch('personas.json').then(response => response.json()).then(data => {
    const lista = document.getElementById('personas')
     let html = ''
     data.forEach(si => {
        
     });
})