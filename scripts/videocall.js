document.addEventListener('DOMContentLoaded', () => {
    const toggleCallButton = document.querySelector('.videocall_start');
    const toggleSubtitlesButton = document.querySelector('.subtitles_btn');
    const videocallMessage = document.querySelector('.videocall_message');
    const videocallVideo = document.querySelector('.videocall_video');
    const callIcon = document.querySelector('.videocall_icon');
    const cameraContainer = document.querySelector('.videocall_camara');

    let cameraStream = null;

    // Función para iniciar la cámara
    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            cameraStream = stream;
            const videoElement = document.createElement('video');
            videoElement.autoplay = true;
            videoElement.muted = true;
            videoElement.playsInline = true;
            videoElement.srcObject = stream;
            videoElement.classList.add('camera-stream');
            cameraContainer.innerHTML = '';
            cameraContainer.appendChild(videoElement);
        } catch (error) {
            alert('No se pudo acceder a la cámara.');
        }
    }

    // Detener la cámara
    function stopCamera() {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
            cameraContainer.innerHTML = '';
        }
    }

    // Alternar subtítulos
    toggleSubtitlesButton.addEventListener('click', () => {
        const tracks = videocallVideo.textTracks;
        if (tracks.length > 0) {
            const subtitles = tracks[0];
            if (subtitles.mode === 'showing') {
                subtitles.mode = 'hidden'; // Ocultar subtítulos
            } else {
                subtitles.mode = 'showing'; // Mostrar subtítulos
            }
        }
    });

    // Toggle botón llamada
    toggleCallButton.addEventListener('click', () => {
        if (!isUserLoggedIn()) {
            showNotification('Debe iniciar sesión para utilizar esta funconalidad.', 'warning');
            return;
        }

        if (videocallVideo.style.display === 'block') {
            videocallVideo.pause();
            videocallVideo.currentTime = 0;
            videocallVideo.style.display = 'none';
            videocallMessage.style.display = 'flex';
            callIcon.src = 'images/call_icon.webp';
            stopCamera();
            toggleSubtitlesButton.style.display = 'none'; // Ocultar botón de subtítulos
        } else {
            videocallMessage.style.display = 'none';
            videocallVideo.style.display = 'block';
            videocallVideo.play();
            callIcon.src = 'images/hang_icon.webp';
            startCamera();
            toggleSubtitlesButton.style.display = 'inline-block'; // Mostrar botón de subtítulos
        }
    });
});
