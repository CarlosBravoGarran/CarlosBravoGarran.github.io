document.addEventListener('DOMContentLoaded', () => {
    const words = ["Árbol de Navidad", "Reno", "Nieve", "Regalo", "Bastón de caramelo", "Estrella", "Papá Noel", "Trineo", "Campanas", "Villancicos"];
    const canvas = document.querySelector('.game2_canvas');
    const ctx = canvas.getContext('2d');
    const wordDisplay = document.querySelector('.random-word');
    const timerDisplay = document.querySelector('.timer_display');
    const gameButton = document.querySelector('.game2_start');
    const messageContainer = document.querySelector('.game2_message');
    const colorButtons = document.querySelectorAll('.color-btn');

    let drawing = false;
    let wordToDraw = '';
    let timer;
    let selectedColor = '#000000'; // Color por defecto negro

    const offsetX = 20;
    const offsetY = 20;

    // Configuración inicial del lienzo
    canvas.width = 400;
    canvas.height = 400;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = selectedColor;

    function getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    function startGame() {
        timerDisplay.style.display = 'inline'

        if (timer) {
            clearInterval(timer);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawing = false;
        timeLeft = 60;
        timerDisplay.textContent = timeLeft;

        wordToDraw = getRandomWord();
        wordDisplay.textContent = wordToDraw;

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);

        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    function startDrawing(e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX + offsetX, e.offsetY + offsetY);
    }

    function draw(e) {
        if (!drawing) return;
        ctx.lineTo(e.offsetX + offsetX, e.offsetY + offsetY);
        ctx.stroke();
    }

    function stopDrawing() {
        drawing = false;
    }

    function endGame() {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseleave', stopDrawing);
        timerDisplay.textContent = '';

        showMessage("¡Tiempo agotado!");
    }

    function showMessage(text) {
        messageContainer.textContent = text;
        messageContainer.classList.add('message-animate');

        setTimeout(() => {
            messageContainer.classList.remove('message-animate');
            messageContainer.textContent = '';
        }, 2000); 
    }

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedColor = button.style.backgroundColor;
            ctx.strokeStyle = selectedColor;
        });
    });

    gameButton.addEventListener('click', startGame);
});
