document.addEventListener('DOMContentLoaded', () => {
    const accessories = document.querySelectorAll('.accessory');
    const gingerbreadBase = document.querySelector('.gingerbread');
    const downloadButton = document.querySelector('.download-btn');

    // Offset para mover el accesorio un poco más abajo y a la derecha
    const offsetX = 5; // 5% más a la derecha
    const offsetY = 5; // 5% más abajo

    // Evento para iniciar el drag
    accessories.forEach(accessory => {
        accessory.addEventListener('dragstart', (e) => {
            const imgSrc = accessory.querySelector('img').src;
            e.dataTransfer.setData('imgSrc', imgSrc);
            const imgElement = accessory.querySelector('img');
            e.dataTransfer.setDragImage(imgElement, 0, 0);
            accessory.style.opacity = '0.5';
        });

        accessory.addEventListener('dragend', () => {
            accessory.style.opacity = '1';
        });
    });

    // Permitir soltar en la base de la galleta
    gingerbreadBase.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    // Soltar el accesorio en la base
    gingerbreadBase.addEventListener('drop', (e) => {
        e.preventDefault();

        const imgSrc = e.dataTransfer.getData('imgSrc');
        const placedAccessory = document.createElement('div');
        placedAccessory.classList.add('placed-accessory');
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;

        placedAccessory.appendChild(imgElement);
        imgElement.style.width = '35px';
        imgElement.style.height = 'auto';

        const rect = gingerbreadBase.getBoundingClientRect();
        let x = (e.clientX - rect.left) / rect.width * 100;
        let y = (e.clientY - rect.top) / rect.height * 100;

        // Ajustar posición con offset
        x += offsetX;
        y += offsetY;

        placedAccessory.style.left = `${x}%`;
        placedAccessory.style.top = `${y}%`;

        gingerbreadBase.appendChild(placedAccessory);

        // Eliminar accesorios al hacer clic en ellos
        placedAccessory.addEventListener('click', () => {
            gingerbreadBase.removeChild(placedAccessory);
        });
    });

    // Descargar la galleta personalizada como imagen
    downloadButton.addEventListener('click', () => {
        html2canvas(gingerbreadBase).then(canvas => {
            const link = document.createElement('a');
            link.download = 'galleta_personalizada.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });
});
