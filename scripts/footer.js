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