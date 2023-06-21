const sliderContainer = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider li');
const paginationItems = document.querySelectorAll('.pagination span');

// Configuración del desplazamiento automático
let currentIndex = 0;
const intervalTime = 5000; //(5 segundos)
let slideInterval;

function moveToSlide(index) {
    // Calcula el desplazamiento en píxeles
    const slideWidth = slides[0].offsetWidth;
    const displacement = -slideWidth * index;

    // Desplaza las diapositivas utilizando transform: translateX
    sliderContainer.style.transform = `translateX(${displacement}px)`;

    // Actualiza la clase 'active' en los puntos de paginación
    paginationItems.forEach((item) => {
        item.classList.remove('active');
    });
    paginationItems[index].classList.add('active');
}

// Moverse a la siguiente diapositiva
function moveToNextSlide() {
    currentIndex++;
    if (currentIndex >= slides.length) {
    currentIndex = 0;
    }
    moveToSlide(currentIndex);
}

paginationItems.forEach((item, index) => {
    item.addEventListener('click', () => {

    clearInterval(slideInterval);

    currentIndex = index;
    moveToSlide(currentIndex);

    slideInterval = setInterval(moveToNextSlide, intervalTime);
    });
});

slideInterval = setInterval(moveToNextSlide, intervalTime);

