
document.addEventListener('mousemove', (e) => {
    // Crea un nuevo elemento para el rastro
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');

    // Posiciona el rastro en las coordenadas del cursor
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;

    // Añade el rastro al documento
    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    const notificationContainer = document.getElementById('notification-container');

    function showNotification(message, type = 'success', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const notificationText = document.createElement('span');
        notificationText.className = 'notification-text';
        notificationText.textContent = message;
        
        const closeButton = document.createElement('button');
        closeButton.className = 'notification-close';
        closeButton.textContent = '×';

        // Cerrar notificación al hacer clic en la X
        closeButton.addEventListener('click', () => {
            notificationContainer.removeChild(notification);
        });

        // Agregar texto y botón al contenedor de la notificación
        notification.appendChild(notificationText);
        notification.appendChild(closeButton);
        notificationContainer.appendChild(notification);

        // Eliminar automáticamente después de la duración
        setTimeout(() => {
            if (notificationContainer.contains(notification)) {
                notificationContainer.removeChild(notification);
            }
        }, duration);
    }
    
    // Exportar la función para usarla globalmente
    window.showNotification = showNotification;


    // Función para verificar si hay un usuario activo
    function isUserLoggedIn() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(user => user.active);
    }

    window.isUserLoggedIn = isUserLoggedIn;
});
