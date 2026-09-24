let biudzetasData = null;

async function loadData() {
    const response = await fetch('data/budget-tabs.json');

    if (!response.ok) {
        throw new Error('Nepavyko nuskaityti JSON failo');
    }

    const data = await response.json();
    return data;
}

async function init() {
    biudzetasData = await loadData();

    pajamos(biudzetasData);
    islaidos(biudzetasData);
    
    perskaiciuotiLentele();
}

init();

function sulygintiPaskutiniusBlokus() {
    const islaidos = document.getElementById('islaidos-2027_su_pasirinkimais');
    const pajamos = document.getElementById('pajamos-2027_su_pasirinkimais');

    if (!islaidos || !pajamos) return;

    // Laikinai nuimame aukštį, kad galėtume išmatuoti tikrą turinio aukštį
    islaidos.style.height = 'auto';
    pajamos.style.height = 'auto';

    const aukstis = Math.max(
        islaidos.scrollHeight,
        pajamos.scrollHeight
    );

    islaidos.style.height = aukstis + 'px';
    pajamos.style.height = aukstis + 'px';
}
