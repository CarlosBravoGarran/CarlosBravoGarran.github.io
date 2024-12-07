  
  document.addEventListener('DOMContentLoaded', function() {
    function togglePopupAyuda() {
        const popup = document.getElementById('help-popup');
        popup.classList.toggle('hidden');
    }

    const enviarMensajeAyuda = (event) => {
        event.preventDefault();

        const consulta = document.getElementById('consulta').value;
        const email = document.getElementById('email').value;

        if (consulta && email) {
            showNotification('Tu mensaje ha sido enviado con éxito. En breve recibirás una respuesta.', 'success');
            togglePopupAyuda();
            document.getElementById('help-form').reset();
        } else {
            showNotification('Por favor completa todos los campos.', 'warning');
        }
    }

    document.querySelector('.help-button').addEventListener('click', togglePopupAyuda);
    document.querySelector('.close-ayuda-button').addEventListener('click', togglePopupAyuda);
    document.getElementById('help-form').addEventListener('submit', enviarMensajeAyuda);

    document.getElementById('consulta').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            enviarMensajeAyuda(event);
        }
    });

    document.getElementById('email').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            enviarMensajeAyuda(event);
        }
    });

  });
