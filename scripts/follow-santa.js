document.addEventListener('DOMContentLoaded', () => {
    // Inicializa el mapa con límites y restricciones
    const map = L.map('map', {
        maxBounds: [
            [-100, -180], // Suroeste
            [100, 180],   // Noreste
        ],
        maxBoundsViscosity: 1.0, // Evita que el mapa se mueva fuera de los límites
        worldCopyJump: false,    // Desactiva el salto entre copias del mundo
    }).setView([40, -3], 4);

    // Agrega el mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 2,        // Ajusta el nivel de zoom mínimo para no hacer el mapa muy pequeño
        noWrap: true,      // Evita que las teselas del mapa se repitan horizontalmente
        attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Crea el icono de Santa Claus
    const santaIcon = L.icon({
        iconUrl: 'images/icon.webp',
        iconSize: [50, 50],
        iconAnchor: [25, 25],
    });

    // Coloca a Santa Claus en una posición inicial
    const santaMarker = L.marker([40, -3], { icon: santaIcon }).addTo(map);

    // Función para generar coordenadas aleatorias dentro de los límites
    function getRandomCoordinates() {
        const lat = Math.random() * 140 - 70; // Latitud entre -70 y 70
        const lng = Math.random() * 360 - 180; // Longitud entre -180 y 180
        return [lat, lng];
    }

    // Intervalo para mover a Santa Claus
    setInterval(() => {
        const newCoords = getRandomCoordinates();
        santaMarker.setLatLng(newCoords);
    }, 10000);

    // Función para calcular distancia usando Haversine
    function calculateDistance(lat1, lng1, lat2, lng2) {
        const toRadians = (degree) => (degree * Math.PI) / 180;
        const R = 6371; // Radio de la Tierra en km
        const dLat = toRadians(lat2 - lat1);
        const dLng = toRadians(lng2 - lng1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distancia en km
    }

    // Función para buscar un país
    async function searchCountry(country) {
        const url = `https://nominatim.openstreetmap.org/search?country=${country}&format=json`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 0) {
            showNotification('País no encontrado.', 'warning');
            return null;
        }

        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
    }

    // Evento del botón de búsqueda
    document.querySelector('.search-btn').addEventListener('click', async () => {
        const country = document.querySelector('.country-search').value.trim();
        if (!country) {
            showNotification('Por favor, introduce un país.', 'warning');
            return;
        }

        const countryCoords = await searchCountry(country);
        if (!countryCoords) return;

        const santaCoords = santaMarker.getLatLng(); // Coordenadas actuales de Santa
        const distance = calculateDistance(
            santaCoords.lat,
            santaCoords.lng,
            countryCoords.lat,
            countryCoords.lng
        );

        showNotification(`Santa está a aproximadamente ${distance.toFixed(2)} km de ${country}.`, 'success');
    });

    // Botón para ubicar a Santa en el mapa
    document.querySelector('.locate-santa-btn').addEventListener('click', () => {
        const santaCoords = santaMarker.getLatLng(); // Coordenadas actuales del icono
        map.setView(santaCoords, 5); // Centra el mapa en el icono y ajusta el zoom
    });
});
