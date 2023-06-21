//Funciona para el carrusel "Más vistas en la semana"
const carruseles = document.querySelectorAll('.carrusel');

carruseles.forEach((carrusel) => {
    const fila = carrusel.querySelector('.portadas');
    const peliculas = carrusel.querySelectorAll('.imagen');

    fila.classList.add('custom-scrollbar'); // Agregar la clase "custom-scrollbar" al elemento "fila"

    const flechaIzquierda = carrusel.querySelector('.flecha-izquierda');
    const flechaDerecha = carrusel.querySelector('.flecha-derecha');
    const speed = 10;

    // Event Listener para la flecha derecha
    flechaDerecha.addEventListener('click', () => {
        fila.scrollLeft += fila.offsetWidth;

        const indicadorActivo = carrusel.querySelector('.indicadores .activo');
        if (indicadorActivo.nextSibling) {
            indicadorActivo.nextSibling.classList.add('activo');
            indicadorActivo.classList.remove('activo');
        }
    });

// Event Listener para la flecha izquierda
flechaIzquierda.addEventListener('click', () => {
    fila.scrollLeft -= fila.offsetWidth;

    const indicadorActivo = carrusel.querySelector('.indicadores .activo');
    if (indicadorActivo.previousSibling) {
        indicadorActivo.previousSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo');
    }
});

// Paginacion
    const numeroPaginas = Math.ceil(peliculas.length / 5);
    const indicadores = carrusel.querySelector('.indicadores');
    for (let i = 0; i < numeroPaginas; i++) {
    const indicador = document.createElement('button');

    if (i === 0) {
        indicador.classList.add('activo');
    }

    indicadores.appendChild(indicador);
    indicador.addEventListener('click', (e) => {
      fila.scrollLeft = i * fila.offsetWidth;

        carrusel.querySelector('.indicadores .activo').classList.remove('activo');
        e.target.classList.add('activo');
    });
}

//Hover
peliculas.forEach((pelicula) => {
    pelicula.addEventListener('mouseenter', (e) => {
        const elemento = e.currentTarget;
        setTimeout(() => {
            peliculas.forEach((pelicula) => pelicula.classList.remove('hover'));
            elemento.classList.add('hover');
    }, 300);
    });
});

carrusel.addEventListener('mouseleave', () => {
    peliculas.forEach((pelicula) => pelicula.classList.remove('hover'));
});
});