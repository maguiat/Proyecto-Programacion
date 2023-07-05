// Obtén la entrada del usuario desde el campo de búsqueda
const userInput = document.getElementById('campoBusqueda').value; // Asegúrate de ajustar 'campoBusqueda' al ID correcto de tu campo de búsqueda

// Realiza la solicitud a la API de TMDB
const apiKey = 'a5f2223ec21c72f1df43c68198cf538c'; // Reemplaza 'TU_CLAVE_DE_API' con tu propia clave de API de TMDB
const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${userInput}`; // Cambia 'movie' por 'tv' si deseas buscar programas de televisión en lugar de películas

fetch(apiUrl)
  .then(response => buscador.json())
  .then(data => {
    // Procesa la respuesta de la API
    console.log(data); // Aquí puedes ver la respuesta de la API en la consola del navegador

    // Aquí puedes extraer los detalles de las películas o programas de televisión y mostrarlos en tu página web
    // Por ejemplo, podrías iterar sobre los resultados y crear elementos HTML para mostrar el título y la imagen de cada película/programa de TV
  })
  .catch(error => {
    console.log('Error:', error);
    // Maneja el error de alguna manera apropiada en tu página web
  });
