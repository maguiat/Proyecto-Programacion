function creaCarrusel(apiUrl, containerId) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(response => {
      const carruselContainer = document.getElementById(containerId);
      response.results.forEach(movie => {
        const portadaDiv = document.createElement('div');
        portadaDiv.classList.add('portada');

        const portadaImg = document.createElement('img');
        portadaImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        portadaImg.alt = movie.title;

        const overlayDiv = document.createElement('div');
        overlayDiv.classList.add('overlay');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        titleDiv.textContent = movie.title;

        const ratingDiv = document.createElement('div');
        ratingDiv.classList.add('rating');
        ratingDiv.textContent = movie.vote_average.toFixed(1); // tofixed acorta a un decimal despues de la coma 
        ratingDiv.style.color = getColor(movie.vote_average); // le vamos a poner color según el rating

        overlayDiv.appendChild(titleDiv);
        overlayDiv.appendChild(ratingDiv);
        portadaDiv.appendChild(portadaImg);
        portadaDiv.appendChild(overlayDiv);
        carruselContainer.appendChild(portadaDiv);

        portadaDiv.addEventListener('click', () => {
          showMovieDetails(movie);
        });
      });
    })
    .catch(err => console.error(err));
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}


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

  const modalCerrar = document.getElementsByClassName('modal-cerrar')[0];
  modalCerrar.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

creaCarrusel('https://api.themoviedb.org/3/trending/movie/day?language=es-ES&api_key=a5f2223ec21c72f1df43c68198cf538c', 'carrusel1');
creaCarrusel('https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&api_key=a5f2223ec21c72f1df43c68198cf538c', 'carrusel2');
creaCarrusel('https://api.themoviedb.org/3/movie/top_rated?language=es-ES&page=1&api_key=a5f2223ec21c72f1df43c68198cf538c', 'carrusel3');
