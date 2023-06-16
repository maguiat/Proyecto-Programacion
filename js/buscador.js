// Obtener referencias a los elementos del DOM
const buscador = document.getElementById('buscador');
const listaPeliculas = document.getElementById('listaPeliculas');

// Cargar los datos desde el archivo JSON
fetch('data/buscador.json')
.then(response => response.json())
.then(data => {
    // Almacenar los datos en una variable
    const peliculas = data;

    // Función para mostrar las películas filtradas en la lista
    function mostrarPeliculas(peliculasFiltradas) {
    listaPeliculas.innerHTML = '';
    peliculasFiltradas.forEach(pelicula => {
        const li = document.createElement('li');
        li.textContent = pelicula.titulo;
        listaPeliculas.appendChild(li);
    });
    listaPeliculas.style.display = peliculasFiltradas.length > 0 ? 'block' : 'none';
    }

    // Evento input del campo de búsqueda
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