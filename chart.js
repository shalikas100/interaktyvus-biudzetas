function atidarytiModal(pavadinimas, items, itemsTotal) {

    document.getElementById('biudzetasModalLabel').textContent = pavadinimas;

    // Tavo būsima lentelė
    let HTML = `<table class ="table table-sm table-hover table-bordered">
        <thead>
            <tr>
                <th class="text-center align-middle small" rowspan="2">${pavadinimas}</th>
                <th class="text-center align-middle small" rowspan="2">2026 m. planas (mln. Eur)</th>
                <th class="text-center align-middle small" rowspan="2">2027 m. prognozė parengta pagal galiojančius teisės aktus (mln. Eur)</th>
                <th class="text-center align-middle small" colspan="2">Pokytis</th>
                <th class="text-center align-middle small" colspan="2">Struktūra (proc.)</th>
                <th class="text-center align-middle small" rowspan="2">Paaiškinimas</th>
            </tr>
            <tr>
                <th class="text-center align-middle small">mln. Eur</th>
                <th class="text-center align-middle small">proc.</th>
                <th class="text-center align-middle small">2026 m. planas</th>
                <th class="text-center align-middle small">2027 m. prognozė</th>
            </tr>
        </thead>
    <tbody>`;

    items.forEach(item => {
        HTML += `<tr>
                    <td style="background:${item.color}" class="align-middle small">${item.name}</td>
                    <td style="background:${item.color}" class="text-center align-middle small">${formatuotiSkaiciu(item.plan2026)}</td>
                    <td style="background:${item.color}" class="text-center align-middle small">${formatuotiSkaiciu(item.forecast2027)}</td>
                    <td style="background:${item.color}" class="text-center align-middle small">${formatuotiSkaiciu(item.change)}</td>
                    <td style="background:${item.color}" class="text-center align-middle small">${formatuotiProcentus(item.changePercent)}</td>
                    <td style="background:${item.color}" class="text-center align-middle small">${formatuotiProcentus(item.share2026)}</td>
                    <td style="background:${item.color}" class="text-center align-middle small">${formatuotiProcentus(item.share2027)}</td>
                    <td style="background:${item.color}" class="align-middle small">${item.explanation}</td>
                </tr>
        `;
    });

    HTML += `<tr>
                <td class="align-middle small">Iš viso</td>   
                <td class="text-center align-middle small">${formatuotiSkaiciu(itemsTotal.plan2026)}</td>
                <td class="text-center align-middle small">${formatuotiSkaiciu(itemsTotal.forecast2027)}</td>
                <td class="text-center align-middle small">${formatuotiSkaiciu(itemsTotal.change)}</td>
                <td class="text-center align-middle small">${formatuotiProcentus(itemsTotal.changePercent)}</td>
            </tr>`;

    HTML +=`</tbody></table>`;
    document.getElementById('biudzetasModalBody').innerHTML = HTML;

    const modal = new bootstrap.Modal(
        document.getElementById('biudzetasModal')
    );

    modal.show();
}

function formatuotiProcentus(value) {
    return `${Math.round(Number(value) * 100)}`;
}

function formatuotiSkaiciu(value) {
    return Number(value).toLocaleString('lt-LT');
}


function pajamos(data) {

    const pajamos = data.tabs[0].items;
    const pajamosTotal = data.tabs[0].totals;
    // Legenda

    const spanAsignavimai = `<span class="info-icon">
                            <i class="fa-solid fa-circle-info"></i>
                                <span class="info-tooltip">
                                    Pinigai, kuriuos valstybė skiria jos pavestiems darbams atlikti.
                                </span>
                            </span>`;
    let HTML = '';

    pajamos.forEach(item => {

        let spanPajamos = '';
        if(item.id === 'deleguotos-funkcijos-pajamos'){
            spanPajamos = spanAsignavimai;
        }

        HTML += `<p style="font-size: 10px;">
            <span class="color" style="background:${item.color}"></span>${item.name}${spanPajamos}</p>`;
    });

    document.getElementById('legenda_pajamos').innerHTML = HTML;

    lenteleAteitis('Pajamos', pajamos, pajamosTotal, 'pajamos-2027'); 
    lenteleAteitisSuPasirinkimais('Pajamos', pajamos, pajamosTotal, 'pajamos-2027_su_pasirinkimais');  

    // grafikas duomenys
    const labels = pajamos.map(item => item.name);
    const values = pajamos.map(item => item.plan2026);
    const colors = pajamos.map(item => item.color);

    new Chart(document.getElementById('pajamos_canva'), {
        type: 'doughnut',

        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
                hoverOffset: 4
            }]
        },

        plugins: [{
            id: 'centerButton',

            afterDraw(chart) {
                const { ctx, chartArea } = chart;

                const x = (chartArea.left + chartArea.right) / 2;
                const y = (chartArea.top + chartArea.bottom) / 2;

                ctx.save();

                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                ctx.fillStyle = '#000';

                ctx.fillText('Išsamiau', x, y);

                ctx.restore();
            }
        }],

        options: {

            responsive: true,
            maintainAspectRatio: false,
            
            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            const value = context.raw;

                            const total = context.dataset.data.reduce(
                                (sum, value) => sum + value,
                                0
                            );

                            const percentage = ((value / total) * 100).toFixed(1);

                            const formattedValue = value.toLocaleString('lt-LT');

                            return [
                                `Suma: ${formattedValue} mln. Eur.`,
                                `Dalis: ${percentage} %`];
                        }
                    }
                }
            },
            onClick: function (event) {

                const x = event.x;
                const y = event.y;

                const chartArea = this.chartArea;

                const centerX = (chartArea.left + chartArea.right) / 2;
                const centerY = (chartArea.top + chartArea.bottom) / 2;

                const distance = Math.sqrt(
                    Math.pow(x - centerX, 2) +
                    Math.pow(y - centerY, 2)
                );

                if (distance < 60) {
                    atidarytiModal('Pajamos', pajamos, pajamosTotal);
                }
            }
        }
    });
}

function islaidos(data) {

    const islaidos = data.tabs[1].items;
    const islaidosTotal = data.tabs[1].totals;
    // Legenda

    const spanSveikata = `<span class="info-icon">
                            <i class="fa-solid fa-circle-info"></i>
                                <span class="info-tooltip">
                                    Valstybės finansuojamos priemonės, padedančios išvengti ligų, jas anksčiau nustatyti arba gydyti.
                                </span>
                            </span>`;
    const spanValstDeleguotos = `<span class="info-icon">
                            <i class="fa-solid fa-circle-info"></i>
                                <span class="info-tooltip">
                                    Paslaugos, vaistai, kurie apmokami valstybės tam skiriamais pinigais.
                                </span>
                            </span>`

    let HTML = '';

    islaidos.forEach(item => {
        let spanIslaidos = '';
        if(item.id === 'sveikatos-programos'){
            spanIslaidos = spanSveikata;
        }else if(item.id === 'deleguotos-funkcijos-islaidos'){
            spanIslaidos = spanValstDeleguotos;
        }

        HTML += `<p style="font-size: 10px;">
            <span class="color" style="background:${item.color}"></span>
            ${item.name}${spanIslaidos}
        </p>`;
    });

    document.getElementById('legenda_islaidos').innerHTML = HTML;

    lenteleAteitis('Išlaidos', islaidos, islaidosTotal, 'islaidos-2027');
    lenteleAteitisSuPasirinkimais('Išlaidos', islaidos, islaidosTotal, 'islaidos-2027_su_pasirinkimais');

    // grafikas duomenys
    const labels = islaidos.map(item => item.name);
    const values = islaidos.map(item => item.plan2026);
    const colors = islaidos.map(item => item.color);

    new Chart(document.getElementById('islaidos_canva'), {
        type: 'doughnut',

        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
                hoverOffset: 4
            }]
        },

        plugins: [{
            id: 'centerButton',

            afterDraw(chart) {
                const { ctx, chartArea } = chart;

                const x = (chartArea.left + chartArea.right) / 2;
                const y = (chartArea.top + chartArea.bottom) / 2;

                ctx.save();

                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#000';

                ctx.fillText('Išsamiau', x, y);

                ctx.restore();
            }
        }],

        options: {

            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    displayColors: true,

                    callbacks: {
                        label: function (context) {
                            const value = context.raw;

                            const total = context.dataset.data.reduce(
                                (sum, value) => sum + value,
                                0
                            );

                            const formattedValue = value.toLocaleString('lt-LT');

                            const percentage = ((value / total) * 100).toLocaleString('lt-LT', {
                                minimumFractionDigits: 1,
                                maximumFractionDigits: 1
                            });

                            return `Suma: ${formattedValue} (${percentage}%)`;
                        }
                    }
                }
            },

            onClick: function (event) {

                const x = event.x;
                const y = event.y;

                const chartArea = this.chartArea;

                const centerX = (chartArea.left + chartArea.right) / 2;
                const centerY = (chartArea.top + chartArea.bottom) / 2;

                const distance = Math.sqrt(
                    Math.pow(x - centerX, 2) +
                    Math.pow(y - centerY, 2)
                );

                if (distance < 60) {
                    atidarytiModal('Išlaidos', islaidos, islaidosTotal);
                }
            }
        }
    });
}









