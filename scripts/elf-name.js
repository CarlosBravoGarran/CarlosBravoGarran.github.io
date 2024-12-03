function generateElfName() {
    const nombre = document.getElementById("elf-name_input").value.trim();
    if (!nombre) {
        showNotification("Por favor, escribe un nombre.", 'warning');
        return;
    }
    const sufijos = ["mir", "dor", "len", "sil", "thar", "wyn", "las", "rin", "dae", "ion"];
    const prefijos = ["Ara", "Gal", "Fin", "Ela", "Bel", "Syl", "Tha", "Eli", "Cal", "Nor"];

    const indiceprefijo = nombre.length % prefijos.length;
    const indicesufijo = nombre.charCodeAt(0) % sufijos.length;

    const nombreElfo = prefijos[indiceprefijo] + sufijos[indicesufijo];

    document.getElementById("elf-name_result").textContent = nombreElfo;
}