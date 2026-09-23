
// Islaidu blokas, zymimi pasirinkimai ////////////////////////////////////////////////////////////

// 1 klausimas
const checkboxesVDU = document.querySelectorAll('input[name="vdu"]');
checkboxesVDU.forEach(checkboxVDU => {
    checkboxVDU.addEventListener('change', function () {
        if (this.checked) {
            // Jei šis pažymimas, atžymime visus kitus
            checkboxesVDU.forEach(otherCheckboxVDU => {
                if (otherCheckboxVDU !== this) {
                    otherCheckboxVDU.checked = false;
                }
            });
        }
    });
});

// 1a klausimas
const answersContainer = document.getElementById('answers_1_a');
const sortable = new Sortable(answersContainer, {
    animation: 200,
    ghostClass: 'sortable-ghost',
    onEnd: function () {
        atnaujintiPrioritetus();
    }
});
function atnaujintiPrioritetus() {
    const answers = [
        ...answersContainer.querySelectorAll('.answer_1_a')
    ];
    const raides = ['a', 'b', 'c', 'd'];
    answers.forEach((answer, index) => {
        // Atnaujiname prioritetą
        answer.querySelector('.priority').textContent = index + 1;

        // Atnaujiname raidę pagal dabartinę poziciją
        answer.querySelector('.atsakymo-raide').textContent =
            raides[index] + ')';
    });
    // Originalių atsakymų ID eilė
    const order = answers.map(answer => Number(answer.dataset.value));
}

// 2 klausimas
const checkboxASP_paslaugos = document.querySelectorAll('input[name="asp-paslaugos"]');
checkboxASP_paslaugos.forEach(checkbox => {
    checkbox.addEventListener('change', function () {

        if (this.value === 'e' && this.checked == true) {

            // Jei pažymėjo "e", atžymime visus kitus
            document.querySelectorAll('input[name="asp-paslaugos"]:not([value="e"])')
                .forEach(other => other.checked = false);
        } else if (this.value !== 'e' && this.checked) {
            // Jei pažymėjo bet kurį kitą, atžymime "e"
            const eCheckbox = document.querySelector('input[name="asp-paslaugos"][value="e"]');
            if (eCheckbox) eCheckbox.checked = false;
        }
    });
});

// 3 klausimas
const checkboxVaistai = document.querySelectorAll('input[name="vaistai"]');
checkboxVaistai.forEach(checkboxVaistai => {
    checkboxVaistai.addEventListener('change', function () {

        if (this.value === 'c' && this.checked == true) {

            // Jei pažymėjo "c", atžymime visus kitus
            document.querySelectorAll('input[name="vaistai"]:not([value="c"])')
                .forEach(other => other.checked = false);
        } else if (this.value !== 'c' && this.checked) {
            // Jei pažymėjo bet kurį kitą, atžymime "e"
            const eCheckbox = document.querySelector('input[name="vaistai"][value="c"]');
            if (eCheckbox) eCheckbox.checked = false;
        }
    });
});


// Pajamu blokas, zymimi pasirinkimai ////////////////////////////////////////////////////////////

// 4 klausimas
const checkboxesPSDpadidinimas = document.querySelectorAll('input[name="psd_imokos_padidinimas"]');
checkboxesPSDpadidinimas.forEach(checkboxPSD_padidinimas => {
    checkboxPSD_padidinimas.addEventListener('change', function () {
        if (this.checked) {
            // Jei šis pažymimas, atžymime visus kitus
            checkboxesPSDpadidinimas.forEach(otherCheckboxPSD_padidinimas => {
                if (otherCheckboxPSD_padidinimas !== this) {
                    otherCheckboxPSD_padidinimas.checked = false;
                }
            });
        }
    });
});

// 5 klausimas
const checkboxesPSDtarifas = document.querySelectorAll('input[name="psd_padidinimas_tarifas"]');
checkboxesPSDtarifas.forEach(checkboxPSD_tarifas => {
    checkboxPSD_tarifas.addEventListener('change', function () {
        if (this.checked) {
            // Jei šis pažymimas, atžymime visus kitus
            checkboxesPSDtarifas.forEach(otherCheckboxPSD_tarifas => {
                if (otherCheckboxPSD_tarifas !== this) {
                    otherCheckboxPSD_tarifas.checked = false;
                }
            });
        }
    });
});

// 6 klausimas
const checkboxPSD_lengvatos_naikinimas = document.querySelectorAll('input[name="psd_lengvatos_naikinimas"]');
checkboxPSD_lengvatos_naikinimas.forEach(checkbox => {
    checkbox.addEventListener('change', function () {

        if (this.value === 'd' && this.checked == true) {

            // Jei pažymėjo "d", atžymime visus kitus
            document.querySelectorAll('input[name="psd_lengvatos_naikinimas"]:not([value="d"])')
                .forEach(other => other.checked = false);
        } else if (this.value !== 'd' && this.checked) {
            // Jei pažymėjo bet kurį kitą, atžymime "e"
            const eCheckbox = document.querySelector('input[name="psd_lengvatos_naikinimas"][value="d"]');
            if (eCheckbox) eCheckbox.checked = false;
        }
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



document.querySelectorAll(
    'input[name="vdu"], ' +
    'input[name="asp-paslaugos"], ' +
    'input[name="vaistai"], ' +
    'input[name="psd_imokos_padidinimas"], ' +
    'input[name="psd_padidinimas_tarifas"], ' +
    'input[name="psd_lengvatos_naikinimas"]'
).forEach(input => {

    input.addEventListener('change', function () {

        perskaiciuotiLentele();

    });

});


function gautiPasirinkimus(name) {

    const pasirinkti = [
        ...document.querySelectorAll(`input[name="${name}"]`)

    ];

    return {
        values: pasirinkti.map(input => input.value),

        items: pasirinkti.map(input => ({
            value: input.value,
            amount: Number(input.dataset.amount || 0),
            checked: input.checked
        }))
    };
}

function gautiFormosPasirinkimus() {

    const vdu = gautiPasirinkimus('vdu');

    const aspPaslaugos =
        gautiPasirinkimus('asp-paslaugos');

    const vaistai =
        gautiPasirinkimus('vaistai');

    const psdImokosPadidinimas =
        gautiPasirinkimus('psd_imokos_padidinimas');

    const psdPadidinimasTarifas =
        gautiPasirinkimus('psd_padidinimas_tarifas');

    const psdLengvatosNaikinimas =
        gautiPasirinkimus('psd_lengvatos_naikinimas');


    const prioritetai1a = [
        ...document.querySelectorAll(
            '#answers_1_a .answer_1_a'
        )
    ].map(answer =>
        Number(answer.dataset.value)
    );


    return {

        vdu: vdu.values[0] ?? null,
        vduItems: vdu.items,

        aspPaslaugos: aspPaslaugos.values,
        aspPaslaugosItems: aspPaslaugos.items,

        vaistai: vaistai.values,
        vaistaiItems: vaistai.items,

        psdImokosPadidinimas:
            psdImokosPadidinimas.values[0] ?? null,

        psdImokosPadidinimasItems:
            psdImokosPadidinimas.items,

        psdPadidinimasTarifas:
            psdPadidinimasTarifas.values[0] ?? null,

        psdPadidinimasTarifasItems:
            psdPadidinimasTarifas.items,

        psdLengvatosNaikinimas:
            psdLengvatosNaikinimas.values,

        psdLengvatosNaikinimasItems:
            psdLengvatosNaikinimas.items,

        prioritetai1a
    };
}










let biudzetoRezultataiCanva = {
    islaidos: null,
    pajamos: null
};

function perskaiciuotiLentele() {

    const islaidos = biudzetasData.tabs[1].items;
    const islaidosTotal = biudzetasData.tabs[1].totals;
    biudzetoRezultataiCanva.islaidos = lenteleAteitisSuPasirinkimais('Išlaidos', islaidos, islaidosTotal, 'islaidos-2027_su_pasirinkimais');

    const pajamos = biudzetasData.tabs[0].items;
    const pajamosTotal = biudzetasData.tabs[0].totals;
    biudzetoRezultataiCanva.pajamos = lenteleAteitisSuPasirinkimais('Pajamos', pajamos, pajamosTotal, 'pajamos-2027_su_pasirinkimais');

    // ATNAUJINAME BENDRĄ GRAFIKĄ
    atnaujintiBiudzetoBalansoCanva();
}

let biudzetoBalansoChart = null;

function atnaujintiBiudzetoBalansoCanva() {

    const pajamos = biudzetoRezultataiCanva.pajamos;
    const islaidos = biudzetoRezultataiCanva.islaidos;

    // PIRMIAUSIA patikriname
    if (!pajamos || !islaidos) return;

    const islaiduPradineTotal = islaidos.reduce(
        (sum, item) => sum + Number(item.pradineSuma || 0),
        0
    );
    const islaiduVartotojoTotal = islaidos.reduce(
        (sum, item) => sum + Number(item.vartotojoSuma || 0),
        0
    );
    const islaiduPrieaugis = islaiduVartotojoTotal - islaiduPradineTotal;

    const pajamuPradineTotal = pajamos.reduce(
        (sum, item) => sum + Number(item.pradineSuma || 0),
        0
    );
    const pajamuVartotojoTotal = pajamos.reduce(
        (sum, item) => sum + Number(item.vartotojoSuma || 0),
        0
    );
    const pajamuPrieaugis = pajamuVartotojoTotal - pajamuPradineTotal;


    const islaiduPervirsis = Math.max(
        0,
        islaiduVartotojoTotal - pajamuVartotojoTotal
    );

    const papildomosIslaidosBePervirsio = Math.max(
        0,
        islaiduPrieaugis - islaiduPervirsis
    );


     const islaiduPervirsisAtvaizdavimui = islaiduVartotojoTotal - pajamuVartotojoTotal;

    const canvas = document.getElementById('biudzeto_balansas_canva');

    if (!canvas) return;

    if (biudzetoBalansoChart) {
        biudzetoBalansoChart.destroy();
    }

    biudzetoBalansoChart = new Chart(canvas, {
        type: 'bar',

        data: {
            labels: ['Išlaidos', 'Pajamos'],

datasets: [
    {
        label: 'Išlaidos (baziniai poreikiai)',
        data: [islaiduPradineTotal, 0],
        backgroundColor: '#FFD966',
        borderWidth: 0
    },
    {
        label: 'Papildomos išlaidos',
        data: [papildomosIslaidosBePervirsio, 0],
        backgroundColor: '#E6B800',
        borderWidth: 0
    },
    {
        label: 'Išlaidų perviršis',
        data: [islaiduPervirsis, 0],
        backgroundColor: '#C00000',
        borderWidth: 0
    },
    {
        label: 'Prognozuojamos pajamos',
        data: [0, pajamuPradineTotal],
        backgroundColor: '#70AD47',
        borderWidth: 0
    },
    {
        label: 'Papildomos pajamos',
        data: [0, pajamuPrieaugis],
        backgroundColor: '#548235',
        borderWidth: 0
    }
]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

                     scales: {
                x: {
                    stacked: true
                },

                y: {
                    stacked: true,
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true
                },

                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${formatuotiSkaiciu(context.raw)} mln.`;
                        }
                    }
                }
            }

   
        }
    });

    let note = '';

    if(islaiduPervirsisAtvaizdavimui > 0){
        note = `
                <div class="alert alert-danger">
                Jūsų išlaidos viršija numatomas pajamas <strong>${islaiduPervirsisAtvaizdavimui} mln. Eur</strong>, o biudžetas negali būti deficitinis. Tad turite pasirinkti, ką darysite toliau:
                * koreguosite išlaidas (grįžti į 1 klausimą);
                *didinsite pajamas (grįžti į 4 klausimą)“.
                </div>
                `;

        let elementasPajamos = document.getElementById('pajamos-2027_su_pasirinkimais');
        let tdPajamos = elementasPajamos.querySelector('tbody tr:last-child td:nth-child(4)');
        if (tdPajamos) {
            tdPajamos.style.backgroundColor = 'red';
            tdPajamos.style.color = 'white';
        }

        let elementasIslaidos = document.getElementById('islaidos-2027_su_pasirinkimais');
        let tdIslaidos = elementasIslaidos.querySelector('tbody tr:last-child td:nth-child(4)');
        if (tdIslaidos) {
            tdIslaidos.style.backgroundColor = 'red';
            tdIslaidos.style.color = 'white';
        }
    }else{
        note = '';
    }


    document.getElementById('note').innerHTML = note;
}

