
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.gallery_item');
    const prevArrow = document.querySelector('.gallery_arrow--left');
    const nextArrow = document.querySelector('.gallery_arrow--right');
    const carousel = document.querySelector('.gallery_items');
    const indicatorsContainer = document.querySelector('.gallery_indicators');

    let currentIndex = Math.floor(items.length / 2); // Índice inicial imagen central
    let itemWidth = items[0].offsetWidth + 20; // Ancho de cada imagen + margen
    let initialOffsetApplied = false; // Ajuste inicial para centrar imagen

    let startX = 0; // Posición inicial del toque
    let endX = 0; // Posición final del toque

    // Crear los indicadores debajo de la galería
    function createIndicators() {
        indicatorsContainer.innerHTML = ''; // Limpiar indicadores previos

        items.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('gallery_indicator');
            if (index === currentIndex) {
                indicator.classList.add('active'); // Marcar el indicador activo
            }
            indicatorsContainer.appendChild(indicator);
        });
    }

    // Actualizar los indicadores activos
    function updateIndicators() {
        const indicators = indicatorsContainer.querySelectorAll('.gallery_indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function updateCarousel(applyInitialOffset = false) {
        // Actualizar clases de posición (active, left, right)
        items.forEach((item, index) => {
            item.classList.remove('active', 'left', 'right');

            if (index === currentIndex) {
                item.classList.add('active'); // Imagen central
            } else if (index === (currentIndex - 1 + items.length) % items.length) {
                item.classList.add('left'); // Imagen a la izquierda
            } else if (index === (currentIndex + 1) % items.length) {
                item.classList.add('right'); // Imagen a la derecha
            }
        });

        // Centrar la imagen activa
        const baseOffset = -(currentIndex * itemWidth) + (carousel.offsetWidth - itemWidth) / 2 - 27;
        const offset = applyInitialOffset && !initialOffsetApplied
            ? baseOffset + 25 // Centrar imagen inicial
            : baseOffset;

        carousel.style.transform = `translateX(${offset}px)`;

        if (applyInitialOffset) {
            initialOffsetApplied = true; // Ya no es la imagen inicial
        }

        // Actualizar los indicadores
        updateIndicators();
    }

    // Mover a la izquierda
    prevArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    });

    // Mover a la derecha
    nextArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    });

    // Detectar gestos de deslizamiento
    carousel.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX; // Guardar posición inicial
    });

    carousel.addEventListener('touchmove', (event) => {
        endX = event.touches[0].clientX; // Actualizar posición final durante el movimiento
    });

    carousel.addEventListener('touchend', () => {
        const deltaX = endX - startX; // Diferencia entre inicio y final del toque

        if (deltaX > 50) {
            // Deslizar hacia la derecha
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        } else if (deltaX < -50) {
            // Deslizar hacia la izquierda
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }

        // Reiniciar las posiciones
        startX = 0;
        endX = 0;
    });

    // Inicializar el carrusel y los indicadores
    createIndicators();
    updateCarousel(true);
});
