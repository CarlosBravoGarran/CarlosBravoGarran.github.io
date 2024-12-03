document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.access_login');
    const loginPopup = document.querySelector('.login-popup');
    const loginForm = document.querySelector('.login_form');
    const closeLoginButton = document.querySelector('.login_close');
    const logoutMenu = document.querySelector('.access_logout');
    const logoutButton = document.querySelector('.logout_button');
    const darkOverlay = document.querySelector('.login_dark-overlay');
    const accessMenuButton = document.querySelector('.access_icon');
    const accessMenu = document.querySelector('.access_menu');
    const loggedIconButton = document.querySelector('.logged_icon');

    // Asegurar que la sesión esté cerrada al cargar la página
    const resetSessions = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.map(user => ({ ...user, active: false }));
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Mostrar el botón de acceso y ocultar el botón de usuario conectado
        accessMenuButton.style.display = 'inline-block';
        loggedIconButton.style.display = 'none';
    };

    resetSessions();

    // Abrir el formulario de login
    loginButton?.addEventListener('click', () => {
        loginPopup.classList.add('open');
        darkOverlay.style.display = 'block';
    });

    // Cerrar el formulario de login
    closeLoginButton?.addEventListener('click', () => {
        loginPopup.classList.remove('open');
        darkOverlay.style.display = 'none';
        loginForm.reset();
    });

    // Cerrar el formulario de login al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!loginPopup.contains(e.target) && !loginButton.contains(e.target)) {
            loginPopup.classList.remove('open');
            darkOverlay.style.display = 'none';
            loginForm.reset();
        }
    });

    // Iniciar sesión
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        // Obtener usuarios de localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex((u) => u.email === email);

        if (userIndex === -1) {
            showNotification('Correo no registrado. Por favor, regístrate primero.', 'warning');
            return;
        }

        const user = users[userIndex];

        // Validar contraseña
        const hashedPassword = CryptoJS.SHA256(password).toString();
        if (user.password !== hashedPassword) {
            showNotification('Contraseña incorrecta. Por favor, intentalo de nuevo.', 'error');
            return;
        }

        // Actualizar sesión activa
        users[userIndex].active = true;
        localStorage.setItem('users', JSON.stringify(users));
        showNotification(`¡Bienvenido, ${user.name}!`, 'success');

        darkOverlay.style.display = 'none';

        // Limpiar y cerrar el formulario
        loginForm.reset();
        loginPopup.classList.remove('open');

        // Cambiar el botón de acceso al menú por el botón de usuario conectado
        accessMenuButton.style.display = 'none';
        accessMenu.style.display = 'none';
        loggedIconButton.style.display = 'inline-block';
    });

    // Cerrar sesión
    logoutButton?.addEventListener('click', () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const activeUserIndex = users.findIndex((u) => u.active === true);

        if (activeUserIndex !== -1) {
            users[activeUserIndex].active = false;
            localStorage.setItem('users', JSON.stringify(users));
            
            // Cerrar menú
            logoutMenu.classList.remove('open');
            setTimeout(() => {
                logoutMenu.style.display = 'none';
            }, 100);
            
            showNotification('Sesión cerrada correctamente.', 'success');

            // Cambiar el botón de usuario conectado por el botón de acceso al menú
            loggedIconButton.style.display = 'none';
            accessMenuButton.style.display = 'inline-block'; // Mostrar botón de acceso al menú
        }
    });
});
