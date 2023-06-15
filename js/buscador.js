const buscador = document.getElementById('buscador');
const listaPeliculas = document.getElementById('listaPeliculas');

buscador.addEventListener('input', function() {
    if (buscador.value.length > 0) {
    listaPeliculas.style.display = 'block';
} else {
    listaPeliculas.style.display = 'none';
}
});

document.addEventListener("keyup", e=>{

    if (e.target.matches("#buscador")){

        if (e.key ==="Escape")e.target.value = ""

        document.querySelectorAll(".pelicula").forEach(peliculas =>{

            peliculas.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ?peliculas.classList.remove("filtro")
                :peliculas.classList.add("filtro")
        })

    }


})