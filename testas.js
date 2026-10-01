

let duomenys = 
{
"amzius":"nenoriu_nurodyti",
"issilavinimas":"nenoriu_nurodyti",
"susijes_su_sveikatos_prieziuros_sistema":"ne",
"susiejimo_tipas":null,
"vdu":["d"],
"asp-paslaugos":["e"],
"vaistai":["c"],
"psd_imokos_padidinimas":["d"],
"psd_padidinimas_tarifas":["d"],
"psd_lengvatos_naikinimas":["d"],
"prioritetas_vdu":["visiems darbuotojams","gydytojams","slaugytojams","kitam personalui"]
};

async function saveJson(data) {
    const response = await fetch('https://script.google.com/macros/s/AKfycbytuBT54Uxxw2m8dqMGtO9ixWSQ-2h8cp-NTl4WQ1thv5CBXixqjIVsz-JxKgBT5bFm/exec', {
    method: 'POST',
    mode: 'cors', // Užtikriname, kad naršyklė žinotų apie CORS
    headers: {
        'Content-Type': 'text/plain;charset=utf-8' 
    },
    body: JSON.stringify(data)
})
.then(async response => {
    const resData = await response.json();
    console.log('Atsakymas iš Google:', resData);
})
.catch(error => console.error('Klaida:', error));
    const result = await response.json();
    console.log(result);
}


 document.getElementById('uzlausti').addEventListener('click', ()=>{

saveJson(duomenys)
 });









