const buscador = document.getElementById('buscador');
const listaPeliculas = document.getElementById('listaPeliculas');

buscador.addEventListener('input', function() {
  const userInput = buscador.value.toLowerCase();

  // Realiza la solicitud a la API de TMDB
  const apiKey = 'a5f2223ec21c72f1df43c68198cf538c'; 
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${userInput}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const peliculas = data.results; // Los resultados se encuentran en la propiedad 'results' del objeto de respuesta

      function mostrarPeliculas(peliculasFiltradas) {
        listaPeliculas.innerHTML = '';
        peliculasFiltradas.forEach(pelicula => {
          const li = document.createElement('li');
          li.textContent = pelicula.title;
          li.addEventListener('click', () => {
            showMovieDetails(pelicula);
          });
          listaPeliculas.appendChild(li);
        });
        listaPeliculas.style.display = peliculasFiltradas.length > 0 ? 'block' : 'none';
      }

      const peliculasFiltradas = peliculas.filter(pelicula =>
        pelicula.title.toLowerCase().includes(userInput)
      );
      mostrarPeliculas(peliculasFiltradas);
    })
    .catch(error => {
      console.error('Error al cargar las películas:', error);
      // Maneja el error de alguna manera apropiada en tu página web
    });
});

function showMovieDetails(movie) {
  const modal = document.getElementById('modal');
  const modalImagen = document.getElementById('modal-imagen');
  const modalTitulo = document.getElementById('modal-titulo');
  const modalDescripcion = document.getElementById('modal-descripcion');
  const modalPuntuacion = document.getElementById('modal-puntuacion');
  const modalTituloOriginal = document.getElementById('modal-titulo-original');
  const modalAnio = document.getElementById('modal-anio');

  modalImagen.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  modalTitulo.textContent = movie.title;
  modalDescripcion.textContent = movie.overview;
  modalPuntuacion.textContent = `Puntuación TMDB: ${movie.vote_average.toFixed(1)}`;
  modalTituloOriginal.textContent = `Título original: ${movie.original_title}`;
  modalAnio.textContent = `Año: ${movie.release_date.split('-')[0]}`;

  modal.style.display = 'block';

  const modalCerrar = document.getElementById('modal-cerrar');
  modalCerrar.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

document.addEventListener('click', function(event) {
  const target = event.target;
  if (target !== buscador && target !== listaPeliculas) {
    listaPeliculas.style.display = 'none';
  }
});


