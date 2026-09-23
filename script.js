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
