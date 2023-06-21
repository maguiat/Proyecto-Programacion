function setupModal() {
    const modal = document.getElementById("modal");
    const cerrarModal = document.querySelector(".modal-cerrar");

    cerrarModal.addEventListener("click", function () {
      modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }

document.addEventListener("DOMContentLoaded", function () {
    fetch("data/peliculas.json")
        .then((response) => response.json())
        .then((data) => {
        const carruselContainer1 = document.getElementById("carrusel1");
        const carruselContainer2 = document.getElementById("carrusel2");
        const carruselContainer3 = document.getElementById("carrusel3");

        const peliculasCarrusel1 = data.slice(0, 12);
        const peliculasCarrusel2 = data.slice(0, 12);
        const peliculasCarrusel3 = data.slice(0, 12);

        function abrirModal(pelicula) {
            const modal = document.getElementById("modal");
            const modalImagen = document.getElementById("modal-imagen");
            const modalTitulo = document.getElementById("modal-titulo");
            const modalDescripcion = document.getElementById("modal-descripcion");

            modalImagen.src = pelicula.imagen;
            modalImagen.alt = pelicula.titulo;
            modalTitulo.textContent = pelicula.titulo;
            modalDescripcion.textContent = pelicula.descripcion;

            modal.style.display = "block";
        }

        function generarContenidoCarrusel(carruselContainer, peliculas) {
        peliculas.forEach((pelicula) => {
            const imagenElement = document.createElement("img");
            imagenElement.src = pelicula.imagen;
            imagenElement.alt = pelicula.titulo;

            const overlayElement = document.createElement("div");
            overlayElement.className = "overlay";

            const textoElement = document.createElement("div");
            textoElement.className = "texto";

            const tituloElement = document.createElement("h5");
            tituloElement.textContent = pelicula.titulo;

            textoElement.appendChild(tituloElement);
            overlayElement.appendChild(textoElement);

            const imagenCompletaElement = document.createElement("div");
            imagenCompletaElement.className = "imagen";
            imagenCompletaElement.appendChild(imagenElement);
            imagenCompletaElement.appendChild(overlayElement);

            carruselContainer.appendChild(imagenCompletaElement);

            imagenCompletaElement.addEventListener("click", () => {
                abrirModal(pelicula);
            });
        });
        }

        generarContenidoCarrusel(carruselContainer1, peliculasCarrusel1);
        generarContenidoCarrusel(carruselContainer2, peliculasCarrusel2);
        generarContenidoCarrusel(carruselContainer3, peliculasCarrusel3);

        setupModal();

        const carruselContainers = document.querySelectorAll(".carrusel");

    })
        .catch((error) => {
            console.error("Error al cargar los datos de las películas:", error);
        });
    });

