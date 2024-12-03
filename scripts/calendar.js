
document.addEventListener('DOMContentLoaded', () => {
    const calendarTabs = document.querySelectorAll('.calendar-tab');
    const calendarDays = document.querySelectorAll('.calendar-day');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupClose = document.querySelector('.popup-close');
    const popupText = document.querySelector('.popup-text');
    const calendarContainer = document.querySelector('.calendar-container');

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;

    // Notas personalizadas para cada día
    const notes = {
        1: "Comienza la cuenta atrás. ¡Sé amable con los demás hoy!",
        2: "Haz una buena acción por alguien que no conozcas.",
        3: "Ayuda a decorar tu casa para la Navidad.",
        4: "Escribe una carta a un ser querido.",
        5: "Canta un villancico en familia.",
        6: "Haz una lista de agradecimientos.",
        7: "Ayuda a alguien en casa con sus tareas.",
        8: "Prepara una receta navideña con tu familia.",
        9: "Coloca una estrella en lo más alto de tu árbol.",
        10: "Recuerda compartir una sonrisa hoy.",
        11: "Dibuja una tarjeta navideña para regalar.",
        12: "Cuenta una historia navideña a alguien especial.",
        13: "Saluda a alguien con alegría navideña.",
        14: "Dedica unos minutos a reflexionar sobre el año.",
        15: "Decora tu ventana con luces o dibujos.",
        16: "Prepara un pequeño regalo para alguien especial.",
        17: "Envía un mensaje cariñoso a un amigo.",
        18: "Comparte un momento de felicidad con tu familia.",
        19: "Escribe tus deseos para el próximo año.",
        20: "Abraza a alguien que quieres mucho.",
        21: "Ayuda a envolver regalos navideños.",
        22: "Prepara una canción o poema navideño.",
        23: "Pasa tiempo con tus seres queridos.",
        24: "¡La Navidad está aquí! Prepárate para disfrutar.",
        25: "¡Feliz Navidad! Comparte tu alegría con todos."
    };

    // Reordenar casillas aleatoriamente
    const calendarElements = Array.from(calendarContainer.children);
    shuffleArray(calendarElements);
    calendarContainer.innerHTML = ''; // Vaciar el contenedor
    calendarElements.forEach(elem => calendarContainer.appendChild(elem)); // Agregar casillas

    // Barajar el array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Clic en las pestañas
    calendarTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation();
            const dayNumber = parseInt(tab.dataset.day, 10);

            // Verificar si es un día futuro
            if (dayNumber > currentDay || currentMonth !== 12) {
                showPopup("Todavía no hemos llegado a ese día, no lo puedes abrir todavía.", true);
                return;
            }

            // Abrir pestaña si no está abierta
            if (!tab.classList.contains('opened')) {
                tab.classList.add('opened');
                disableHover(tab);
                showPopup(notes[dayNumber], false);
            }
        });
    });

    // Cerrar la pestaña al hacer clic en la casilla correspondiente
    calendarDays.forEach(day => {
        day.addEventListener('click', () => {
            const tab = day.querySelector('.calendar-tab');
            if (tab && tab.classList.contains('opened')) {
                tab.classList.remove('opened');
                enableHover(tab);
            }
        });
    });

    // Mostrar mensaje en el popup
    function showPopup(message, isBlocked) {
        popupText.textContent = message;
        popupText.classList.toggle('blocked', isBlocked); // Cambiar color para días futuros
        popupOverlay.style.display = 'flex';
    }

    // Cerrar el popup al hacer clic en la "x"
    popupClose.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
    });

    // Cerrar el popup al hacer clic fuera del contenido
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });

    // Desactivar temporalmente el hover de una pestaña al abrir
    function disableHover(tab) {
        tab.classList.add('no-hover');
    }

    // Reactivar el hover de una pestaña después de cerrarla
    function enableHover(tab) {
        setTimeout(() => {
            tab.classList.remove('no-hover');
        }, 2000);
    }
});
