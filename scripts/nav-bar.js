
document.addEventListener('DOMContentLoaded', () => {

    // --- Menú Lateral ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        menu.classList.toggle('open');
    });

    // --- Barra de Búsqueda ---
    const searchContainer = document.querySelector('.search-bar');
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-text');
    const suggestions = document.getElementById('suggestions');

    // Mostrar/Ocultar barra de búsqueda
    searchIcon?.addEventListener('click', () => {
        if (!searchContainer.classList.contains('active')) {
            searchContainer.classList.add('active');
            searchInput.focus(); // Foco automático en la barra de búsqueda
        } else if (searchInput.value.trim()) {
            navigateToSection(searchInput.value.trim());
            closeSearchBar();
        } else {
            closeSearchBar();
        }
    });

    // Navegar al presionar Enter
    searchInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            navigateToSection(searchInput.value.trim());
            closeSearchBar();
        }
    });

    // Secciones del sitio web
    const sections = [
        "Inicio",
        "Historia",
        "Calendario",
        "Sigue a Santa",
        "Cartas",
        "Videollamada",
        "Tu Nombre de Elfo",
        "Conviertete en Elfo",
        "Las Listas",
        "Juegos",
        "Galería",
        "Experiencia"
    ];

    // Mostrar sugerencias al escribir
    searchInput?.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        suggestions.innerHTML = ""; // Limpiar sugerencias anteriores

        if (query) {
            const filteredSections = sections.filter(section =>
                section.toLowerCase().includes(query)
            );

            if (filteredSections.length > 0) {
                suggestions.style.display = "block";
                filteredSections.forEach(section => {
                    const li = document.createElement("li");
                    li.textContent = section;
                    li.addEventListener("click", () => {
                        searchInput.value = section; // Escribir la sugerencia seleccionada en el input
                        suggestions.style.display = "none"; // Ocultar las sugerencias
                    });
                    suggestions.appendChild(li);
                });
            } else {
                displayNoResults();
            }
        } else {
            suggestions.style.display = "none";
        }
    });

    // Ocultar sugerencias al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!searchContainer.contains(e.target)) {
            suggestions.style.display = "none";
        }
    });

    // Navegar a la sección correspondiente
    function navigateToSection(section) {
        const sectionIdMap = {
            "Inicio": "home",
            "Historia": "history",
            "Calendario": "calendar",
            "Sigue a Santa": "follow-santa",
            "Cartas": "letters",
            "Videollamada": "videocall",
            "Tu Nombre de Elfo": "elf-name",
            "Foto con Papá Noel": "santa-picture",
            "Las Listas": "lists",
            "Juegos": "games",
            "Galería": "gallery",
            "Experiencia": "experience"
        };

        const id = sectionIdMap[section];
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Cerrar la barra de búsqueda
    function closeSearchBar() {
        searchContainer.classList.remove('active');
        searchInput.value = "";
        suggestions.style.display = "none";
    }

    // Mostrar "Sin resultados"
    function displayNoResults() {
        const li = document.createElement("li");
        li.textContent = "Sin resultados";
        li.style.color = "#999";
        suggestions.appendChild(li);
    }

    // --- Botones de Acceso ---
    const accessButton = document.querySelector('.access_icon');
    const accessMenu = document.querySelector('.access_menu');
    const logoutMenu = document.querySelector('.access_logout');
    const logoutButton = document.querySelector('.logged_icon');

    // Toggle menú de acceso al hacer clic en el botón de acceso
    accessButton?.addEventListener('click', () => {
        accessMenu.style.display = 'block';
        setTimeout(() => {
            accessMenu.classList.toggle('open');
        }, 100);
    });

    // toggle menú logout al hacer clic en el botón de logout
    logoutButton?.addEventListener('click', () => {
        logoutMenu.style.display = 'block';
        console.log('logoutButton');
        setTimeout(() => {
            logoutMenu.classList.toggle('open');
        }, 100);
    });

    document.getElementById('modoOscuroSwitch').addEventListener('change', function() {
        localStorage.setItem('modoOscuro', 'false');
        if (this.checked) {
            // colores modo oscuro
            document.documentElement.style.setProperty('--color-text2', '#d4bfbf');
            document.documentElement.style.setProperty('--color-background-global', '#251819');
            document.documentElement.style.setProperty('--color-popup', '#3E2B2B');
            //añadir a local storage una seccion de modo oscuro activado
            localStorage.setItem('modoOscuro', 'true');

        } else {
            // colores modo claro
            document.documentElement.style.setProperty('--color-text2', '#2F2223');
            document.documentElement.style.setProperty('--color-background-global', '#e7c47f');
            document.documentElement.style.setProperty('--color-popup', '#e7d77ff9');
            //añadir a local storage una seccion de modo oscuro desactivado
            localStorage.removeItem('modoOscuro');
        }
    });
    
});

