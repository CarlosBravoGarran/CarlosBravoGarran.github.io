document.addEventListener('DOMContentLoaded', () => {
    const enviarCartaButton = document.querySelector('.formulario_enviar_carta');
    const cartaSanta = document.querySelector('.carta_santa');

    const mostrarSobre = (nombre, ciudad, pais) => {
        showNotification('')
        cartaSanta.style.display = 'block'; 
        cartaSanta.addEventListener('click', () => mostrarCarta(nombre, ciudad, pais));
    };

    const mostrarCarta = (nombre, ciudad, pais) => {
        const cartaDiv = document.createElement('div');
        cartaDiv.classList.add('carta-personalizada');
        cartaDiv.innerHTML = `
            <div class="carta-contenido">
                <h2>Querido(a) ${nombre},</h2>
                <p>¡Ho, ho, ho! ¡Qué alegría recibir tu carta desde ${ciudad}, ${pais}!</p>
                <p>Me he sentado junto a los elfos para leerla con mucha atención, y me ha hecho sonreír de oreja a oreja.</p>
                <p>He anotado cuidadosamente tus peticiones y he comprobado que has estado esforzándote por ser amable y responsable durante el año. ¡Estoy muy orgulloso de ti!. Los elfos ya se han puesto en marcha en el taller para crear tus regalos. </p>
                <p>Pero recuerda, la Navidad no es solo recibir regalos, sino compartir amor, alegría y momentos mágicos con tus seres queridos.</p>
                <p>Mi trineo está casi listo para el gran viaje, y mis renos también. No olvides dejarles unas galletas, ¡les encantan! </p>    
                <p>Nos vemos muy pronto en Nochebuena. ¡No olvides soñar con cosas maravillosas!</p>
                <p>Con mucho cariño y un gran "Ho, ho, ho",</p>
                <p>Papá Noel 🎅</p>
                <button class="cerrar-carta">x</button>
            </div>
        `;
        document.body.appendChild(cartaDiv);

        cartaDiv.querySelector('.cerrar-carta').addEventListener('click', () => {
            cartaDiv.remove();
            cartaSanta.style.display = 'none'; 
        });
    };

    const enviarCarta = (event) => {
        event.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const ciudad = document.getElementById('ciudad').value;
        const pais = document.getElementById('pais').value;

        // Verificar si el usuario ha iniciado sesión
        if (window.isUserLoggedIn()) {
            showNotification('Tu carta ha sido enviada con éxito. En breve recibirás una respuesta.', 'success');
            document.querySelector('.formulario_enviar_carta').reset();
            setTimeout(() => mostrarSobre(nombre, ciudad, pais), 3000);

        } else {
            showNotification('Debes iniciar sesión para enviar una carta.', 'warning');
        }
    };

    enviarCartaButton?.addEventListener('submit', enviarCarta);
});