document.addEventListener('DOMContentLoaded', () => {
    const gameButtons = document.querySelectorAll('.game_btn');
    const closeGameButton = document.querySelector('.close-game_btn');
    const gameContainer = document.querySelector('.game_container');
    const gameButtonsContainer = document.querySelector('.game_buttons');
    const games = document.querySelectorAll('.game');

    // Variables para temporizadores de los juegos
    let game2Timer = null;
    let game3Timer = null;

    // Mostrar el juego seleccionado
    function showGame(gameNumber) {
        resetGameState(); // Resetear juegos antes de mostrar uno nuevo

        // Ocultar todos los juegos
        games.forEach(game => game.classList.remove('show'));

        // Mostrar el juego seleccionado
        const selectedGame = document.getElementById(`game${gameNumber}`);
        if (selectedGame) {
            selectedGame.classList.add('show');
        }

        // Mostrar el contenedor del juego y el botón de cerrar
        gameContainer.style.display = 'flex';
        closeGameButton.style.display = 'flex';

        // Ajustar el diseño de los botones
        gameButtonsContainer.classList.add('open');
    }

    // Función para cerrar el juego
    function closeGame() {
        // Ocultar todos los juegos
        games.forEach(game => game.classList.remove('show'));

        // Ocultar el contenedor del juego y el botón de cerrar
        gameContainer.style.display = 'none';
        closeGameButton.style.display = 'none';

        // Restablecer el diseño de los botones
        gameButtonsContainer.classList.remove('open');

        resetGameState(); // Resetear juegos al cerrar
    }

    // Restablecer el estado de los juegos
    function resetGameState() {
        games.forEach(game => {
            // Juego 1: Limpiar accesorios colocados
            const placedAccessories = game.querySelectorAll('.placed-accessory');
            placedAccessories.forEach(accessory => accessory.remove());

            // Juego 2: Restablecer canvas, palabra y temporizador
            const canvas = game.querySelector('.game2_canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar canvas

                const wordDisplay = game.querySelector('.random-word');
                if (wordDisplay) wordDisplay.textContent = '...'; // Limpiar palabra

                const timerDisplay = game.querySelector('.timer_display');
                if (timerDisplay) timerDisplay.style.display = 'none'; // Reiniciar tiempo
            }

            // Juego 3: Reiniciar estado
            endGame3(false); // Finalizar el juego 3

            const livesContainer = game.querySelector('.game3_lives');
            if (livesContainer) {
                livesContainer.innerHTML = ''; // Reiniciar vidas
            }

            const timerDisplay = game.querySelector('.game3_timer-display');
            if (timerDisplay) {
                timerDisplay.textContent = '60'; // Reiniciar temporizador
            }

            const endMessage = game.querySelector('.game3_message');
            if (endMessage) {
                endMessage.style.display = 'none';
                endMessage.textContent = '';
            }

            // Detener el temporizador del Juego 3
            if (game3Timer) {
                clearInterval(game3Timer);
                game3Timer = null;
            }
            
        });
    }

    // Eventos para botones de juegos
    gameButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const gameNumber = index + 1; // Obtener el número del juego
            showGame(gameNumber);
        });
    });

    // Evento para cerrar el juego
    closeGameButton.addEventListener('click', closeGame);
});
