function lenteleAteitis(pavadinimas, data, dataTotal, container) {

    let hover = '';
    if(pavadinimas == 'Išlaidos'){
        hover = `<span class="info-icon">
            <i class="fa-solid fa-circle-info"></i>
            <span class="info-tooltip">
                Būtinos išlaidos anksčiau priimtų sprendimų įgyvendinimo tęstinumui užtikrinti, pvz., jau kompensuojamos sveikatos priežiūros apmokėjimui užtikrinti.
            </span>
        </span>`;
    }

 
    let table = `
        <table class ="table table-hover lentele_${container}">
            <thead>
                <tr>
                    <th scope="col" style="background-color: ${dataTotal.color};" class="text-center align-middle">${pavadinimas}</th>
                    <th scope="col" style="background-color: ${dataTotal.color};" class="text-center align-middle">Bazinės ${pavadinimas.toLowerCase()} ${hover}</th>
                    <th scope="col" style="background-color: ${dataTotal.color};" class="text-center align-middle">Struktūra, proc.</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">`;

    let pinigaiTotal = 0;
    if (pavadinimas == 'Išlaidos') {
        pinigaiTotal = dataTotal.forecast2027 - 474;
    } else {
        pinigaiTotal = dataTotal.forecast2027;
    }

    data.forEach(element => {

        let pinigai = 0;
        if (pavadinimas == 'Išlaidos' && element.id == 'asmens-sveikatos-prieziura') {
            pinigai = element.forecast2027 - 324;
        } else if (pavadinimas == 'Išlaidos' && element.id == 'vaistai-ir-priemones') {
            pinigai = element.forecast2027 - 96;
        } else if (pavadinimas == 'Išlaidos' && element.id == 'sveikatos-programos') {
            pinigai = element.forecast2027 - 54;
        } else {
            pinigai = element.forecast2027;
        };

        const procentai = Math.round(
            (pinigai / pinigaiTotal) * 100
        );

        table += `
            <tr>
                <td scope="row" class="align-middle">${element.name}</td>
                <td class="text-center align-middle">${formatuotiSkaiciu(pinigai)}</td>
                <td class="text-center align-middle">${procentai}</td>
            </tr>`;
    });

    table += `
        <tr>
            <td scope="row" class="align-middle">Iš viso</td>
            <td class="text-center align-middle">${formatuotiSkaiciu(pinigaiTotal)}</td>
            <td class="text-center align-middle">100</td>
        </tr>`;

    table += `
            </tbody>
        </table>`;

    document.getElementById(container).innerHTML = table;
}

function lenteleAteitisSuPasirinkimais(pavadinimas, data, dataTotal, container) {

    let pinigaiTotal = 0;

    if (pavadinimas == 'Išlaidos') {
        pinigaiTotal = dataTotal.forecast2027 - 474;
    } else {
        pinigaiTotal = dataTotal.forecast2027;
    }

    let pradiniaiDuomenys = [];
    data.forEach(element => {

        let pinigai = 0;

        // Bazinė suma
        if (pavadinimas == 'Išlaidos' && element.id == 'asmens-sveikatos-prieziura') {
            pinigai = element.forecast2027 - 324;
        } else if (pavadinimas == 'Išlaidos' && element.id == 'vaistai-ir-priemones') {
            pinigai = element.forecast2027 - 96;
        } else if (pavadinimas == 'Išlaidos' && element.id == 'sveikatos-programos') {
            pinigai = element.forecast2027 - 54;
        } else {
            pinigai = element.forecast2027;
        }

        pradiniaiDuomenys.push({
            element,
            pinigai,
        });

    });

    const pasirinkimai = gautiFormosPasirinkimus();
    let vartotojoPasirinktiDuomenys = [];
    pradiniaiDuomenys.forEach(item => {

        const element = item.element;
        const pinigai = item.pinigai;

        // 1 Klausimas
        let vduPasirinkimai = pasirinkimai.vduItems;
        let vduAmount = 0;
        vduPasirinkimai.forEach(element => {
            let amount = element.checked == true ? element.amount : 0;
            vduAmount += amount;
        });

        // 2 Klausimas
        let aspPaslaugosPasirinkimai = pasirinkimai.aspPaslaugosItems;
        let aspPaslaugosAmount = 0;
        aspPaslaugosPasirinkimai.forEach(element => {
            let amount = element.checked == true ? element.amount : 0;
            aspPaslaugosAmount += amount;
        });

        // 3 Klausimas
        let vaistaiPasirinkimai = pasirinkimai.vaistaiItems;
        let vaistaiAmount = 0;
        vaistaiPasirinkimai.forEach(element => {
            let amount = element.checked == true ? element.amount : 0;
            vaistaiAmount += amount;
        });

        // 4 Klausimas
        let psdImokosPadidinimasPasirinkimai = pasirinkimai.psdImokosPadidinimasItems;
        let psdImokosPadidinimasAmount = 0;
        psdImokosPadidinimasPasirinkimai.forEach(element => {
            let amount = element.checked == true ? element.amount : 0;
            psdImokosPadidinimasAmount += amount;
        });

        // 5 Klausimas
        let psdPadidinimasTarifasPasirinkimai = pasirinkimai.psdPadidinimasTarifasItems;
        let psdPadidinimasTarifasAmount = 0;
        psdPadidinimasTarifasPasirinkimai.forEach(element => {
            let amount = element.checked == true ? element.amount : 0;
            psdPadidinimasTarifasAmount += amount;
        });

        // 6 Klausimas
        let psdLengvatosNaikinimasPasirinkimai = pasirinkimai.psdLengvatosNaikinimasItems;
        let psdLengvatosNaikinimasAmount = 0;
        psdLengvatosNaikinimasPasirinkimai.forEach(element => {
            let amount = element.checked == true ? element.amount : 0;
            psdLengvatosNaikinimasAmount += amount;
        });

        let vartotojoPinigai = 0;

        if (element.id == 'asmens-sveikatos-prieziura') {
            /// Sumos "Asmens sveikatos priežiūros paslaugoms tenka" paskaiciavimas. JSON ID: asmens-sveikatos-prieziura
            vartotojoPinigai = Math.round(pinigai + 0.96 * vduAmount + aspPaslaugosAmount);
        } else if (element.id == 'vaistai-ir-priemones') {
            // Sumos "Vaistams ir medicinos pagalbos priemonėms tenka" paskaiciavimas. JSON ID: vaistai-ir-priemones
            vartotojoPinigai = Math.round(pinigai + vaistaiAmount);
        } else if (element.id == 'sveikatos-programos') {
            // Sumos "Sveikatos programoms tenka" paskaiciavimas. JSON ID: sveikatos-programos
            let aspPaslaugos_pasirinkimasD = pasirinkimai.aspPaslaugosItems[3];
            let aspPaslaugosD = aspPaslaugos_pasirinkimasD.checked == true ? aspPaslaugos_pasirinkimasD.amount : 0;
            vartotojoPinigai = Math.round(pinigai + 0.04 * vduAmount + aspPaslaugosD);
        } else if (element.id == 'valstybes-psd') {
            // Sumos "Valstybės biudžeto PSD įmokos" paskaiciavimas. JSON ID: valstybes-psd
            vartotojoPinigai = Math.round(pinigai + psdImokosPadidinimasAmount);
        } else if (element.id == 'gyventoju-psd') {
            // Sumos "Gyventojų privalomojo sveikatos draudimo (PSD) įmokos" paskaiciavimas. JSON ID: gyventoju-psd
            vartotojoPinigai = Math.round(pinigai + psdPadidinimasTarifasAmount + psdLengvatosNaikinimasAmount);
        } else {
            vartotojoPinigai = pinigai;
        }

        let klausimoID = element.id;

        vartotojoPasirinktiDuomenys.push({

            klausimoID: klausimoID,
            vartotojoPinigai: vartotojoPinigai
        });


    });

    const pTotal = pradiniaiDuomenys.reduce(
        (sum, item) => sum + Number(item.pinigai || 0),
        0
    );

    const vTotal = vartotojoPasirinktiDuomenys.reduce(
        (sum, item) => sum + Number(item.vartotojoPinigai || 0),
        0
    );


    const galutiniaiDuomenys = pradiniaiDuomenys.map(item => {

        const id = item.element.id;

        const vartotojoItem = vartotojoPasirinktiDuomenys.find(
            pasirinkimas => pasirinkimas.klausimoID === id
        );

        const pradineSuma = Number(item.pinigai || 0);

        const vartotojoSuma = vartotojoItem
            ? Number(vartotojoItem.vartotojoPinigai || 0)
            : pradineSuma;

        const pradinisProcentas = pTotal > 0
            ? Math.round((pradineSuma / pTotal) * 100)
            : 0;

        const vartotojoProcentas = vTotal > 0
            ? Math.round((vartotojoSuma / vTotal) * 100)
            : 0;

        return {
            id: id,
            name: item.element.name,

            pradineSuma: pradineSuma,
            vartotojoSuma: vartotojoSuma,

            pradinisProcentas: pradinisProcentas,
            vartotojoProcentas: vartotojoProcentas
        };
    });

    let hoverBazines = '';
    let hoverVartotojo = '';

    if(pavadinimas == 'Išlaidos'){

        hoverBazines = `
                        <span class="info-icon">
                            <i class="fa-solid fa-circle-info"></i>
                            <span class="info-tooltip">
                                Būtinos išlaidos anksčiau priimtų sprendimų įgyvendinimo tęstinumui užtikrinti.
                            </span>
                        </span>
                        `;

        hoverVartotojo = `
                        <span class="info-icon">
                            <i class="fa-solid fa-circle-info"></i>
                            <span class="info-tooltip">
                                Prie bazinių išlaidų pridėtos pagal Jūsų prioritetus numatomos išlaidos.
                            </span>
                        </span>
                        `;
    }

    let table = `
        <table class="table table-sm table-hover table-bordered lentele_${container}">
            <thead>
                <tr>
                    <th style="background-color: ${dataTotal.color};" class="text-center align-middle small">
                        ${pavadinimas}
                    </th>
                    <th style="background-color: ${dataTotal.color};" class="text-center align-middle small">
                        Bazinės ${pavadinimas.toLowerCase()} ${hoverBazines}
                    </th>
                    <th style="background-color: ${dataTotal.color};" class="text-center align-middle small">
                        Struktūra, proc.
                    </th>
                    <th style="background-color: ${dataTotal.color};" class="text-center align-middle small">
                        Jūsų biudžeto išlaidos  ${hoverVartotojo}
                    </th>
                    <th style="background-color: ${dataTotal.color};" class="text-center align-middle small">
                        Struktūra
                    </th>
                </tr>
            </thead>
            <tbody>
    `;

    galutiniaiDuomenys.forEach(item => {

        let color = '';

        if(pavadinimas == 'Išlaidos'){
            color = '#FFF2CC';
        }else if(pavadinimas == 'Pajamos'){
            color = '#E2EFDA';
        }else{
            color = 'white';
        }

        let cellBackground = ` style="background-color: ${color};" `;
        if(item.pradineSuma == item.vartotojoSuma){
            cellBackground = '';
        }


        table += `
                <tr>
            <td>${item.name}</td>
            <td class="text-center align-middle small">
                ${formatuotiSkaiciu(item.pradineSuma)}
            </td>
            <td class="text-center align-middle small">
                ${item.pradinisProcentas}
            </td>
            <td ${cellBackground} class="text-center align-middle small">
                ${formatuotiSkaiciu(item.vartotojoSuma)}
            </td>
            <td ${cellBackground} class="text-center align-middle small">
                ${item.vartotojoProcentas}
            </td>
        </tr>
        `
    });

    table += `
        <tr>
            <td class="align-middle small">
                Iš viso
            </td>
            <td class="text-center align-middle small">
                ${formatuotiSkaiciu(pTotal)}
            </td>
            <td class="text-center align-middle small">
                100
            </td>
            <td class="text-center align-middle small">
                ${formatuotiSkaiciu(vTotal)}
            </td>
            <td class="text-center align-middle small">
                100
            </td>
        </tr>
    `;

    table += `
            </tbody>
        </table>
    `;

    document.getElementById(container).innerHTML = table;

    return galutiniaiDuomenys;
}
