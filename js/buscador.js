const buscador = document.getElementById('buscador');
const listaPeliculas = document.getElementById('listaPeliculas');

fetch('data/buscador.json')
.then(response => response.json())
.then(data => {
    const peliculas = data;

    function mostrarPeliculas(peliculasFiltradas) {
    listaPeliculas.innerHTML = '';
    peliculasFiltradas.forEach(pelicula => {
        const li = document.createElement('li');
        li.textContent = pelicula.titulo;
        listaPeliculas.appendChild(li);
    });
    listaPeliculas.style.display = peliculasFiltradas.length > 0 ? 'block' : 'none';
    }

    buscador.addEventListener('input', function() {
        const filtro = buscador.value.toLowerCase();
        const peliculasFiltradas = peliculas.filter(pelicula =>
            pelicula.titulo.toLowerCase().includes(filtro)
        );
    mostrarPeliculas(peliculasFiltradas);
    });
    document.addEventListener('click', function(event) {
        const target = event.target;
        if (target !== buscador && target !== listaPeliculas) {
            listaPeliculas.style.display = 'none';
        }
    });
})
.catch(error => console.error('Error al cargar las películas:', error));