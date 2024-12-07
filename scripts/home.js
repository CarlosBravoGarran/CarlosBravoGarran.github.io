

document.addEventListener('DOMContentLoaded', function() {
    const elements = [
        { className: 'imagen-interactiva_historia', href: '#history' },
        { className: 'imagen-interactiva_calendario', href: '#calendar' },
        { className: 'imagen-interactiva_mapa', href: '#follow-santa' },
        { className: 'imagen-interactiva_cartas', href: '#letters' },
        { className: 'imagen-interactiva_videollamada', href: '#videocall' },
        { className: 'imagen-interactiva_nombre-elfo', href: '#elf-name' },
        { className: 'imagen-interactiva_conviertete_elfo', href: '#santa-picture' },
        { className: 'imagen-interactiva_listas', href: '#lists' },
        { className: 'imagen-interactiva_juegos', href: '#games' },
        { className: 'imagen-interactiva_galeria', href: '#gallery' },
        { className: 'imagen-interactiva_experiencia', href: '#experience' }
    ];

    elements.forEach(function(element) {
        const el = document.querySelector(`.${element.className}`);
        if (el) {
            el.addEventListener('click', function() {
                location.href = element.href;
            });
            el.addEventListener('keypress', function() {
                location.href = element.href;
            });
        }
    });
});