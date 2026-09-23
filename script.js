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

    // Nuimame ankstesnį fiksuotą aukštį
    islaidos.style.height = 'auto';
    pajamos.style.height = 'auto';

    // Randame didesnį realų aukštį
    const aukstis = Math.max(
        islaidos.offsetHeight,
        pajamos.offsetHeight
    );

    // Abu blokai tampa tokio pat aukščio
    islaidos.style.height = aukstis + 'px';
    pajamos.style.height = aukstis + 'px';
}

window.addEventListener('load', sulygintiPaskutiniusBlokus);
window.addEventListener('resize', sulygintiPaskutiniusBlokus);