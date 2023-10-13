const input = document.querySelector('#input-gare');
const bouton = document.querySelector('#recherche');
const container = document.querySelector('#train-container');
const urlApiSncf = "https://api.sncf.com";
const urlDataSncf = "https://data.sncf.com";
const headers = {
    "Authorization" : "6d992b49-f48d-4c16-a560-6994483ae0b2"
}
let gareDemande;

// Fonction qui transforme la date SNCF en heure
function getHour(dateHeure) {
    // Extrait l'année, le mois, le jour, l'heure, les minutes et les secondes de la chaîne d'entrée
    const annee = dateHeure.slice(0, 4);
    const mois = dateHeure.slice(4, 6);
    const jour = dateHeure.slice(6, 8);
    const heure = dateHeure.slice(9, 11);
    const minutes = dateHeure.slice(11, 13);
    const secondes = dateHeure.slice(13, 15);
  
    // Retourne l'heure formatée
    return `${heure}:${minutes}:${secondes}`;
} 

const getDataSncf = async (url) => {
    const data = await fetch(url)
    const json = data.json()
    return json
}

const getApiSncf = async (url) => {
    const data = await fetch(url, {
        headers: headers
    })
    const json = data.json()
    return json
}

async function getUicCodeSncf(url, gare) {
    try {
        const data = await getDataSncf(url + "/api/explore/v2.1/catalog/datasets/referentiel-gares-voyageurs/records?limit=20&refine=gare_alias_libelle_fronton%3A" + gare)
        return data.results[0].uic_code
    } catch (error) {
        console.error(error)
    }
}

async function getInfoApi(url, uicCode) {
    try {
        console.log(url + "/v1/coverage/sncf/stop_areas/stop_area%3ASNCF%3A" + uicCode + "/arrivals?")
        const data = await getApiSncf(url + "/v1/coverage/sncf/stop_areas/stop_area%3ASNCF%3A" + uicCode + "/arrivals?")
        return data
    } catch (error) {
        console.error(error)
    }
}

async function affichageGare(){
    gareDemande = document.getElementById('input-gare').value
    console.log(gareDemande)
    try {
        const UIC = (await getUicCodeSncf(urlDataSncf, gareDemande)).slice(2)
        console.log(UIC)
        const dataApi = await getInfoApi(urlApiSncf, UIC)
        console.log(dataApi)
        container.innerHTML = ""
        dataApi.arrivals.forEach(element => {
            console.log(element.display_informations.headsign)
            let retard = "black"
            if (element.stop_date_time.data_freshness == "base_schedule") {
                retard = "green-500"
            } else if (element.stop_date_time.data_freshness == "realtime") {
                retard = "orange-500"
            }
            container.innerHTML += 
            `<div class="p-2 md:w-full cursor-pointer">
                <div class="h-full border-2 border-gray-300 border-opacity-60 rounded-lg overflow-hidden">
                    <div class="flex flex-row flex-center items-center gap-3 ml-2">
                        <div class="colored-dot w-[10px] h-[10px] bg-${retard} rounded-full"></div>
                        <h1 class="title-font text-lg font-medium text-gray-900">${getHour(element.stop_date_time.arrival_date_time)}</h1>
                        <p class="leading-relaxed">${element.display_informations.direction}</p>
                    </div>
                </div>
            </div>`
        });
    } catch (error) {
        console.error(error)
    }
}

bouton.addEventListener('click', async() => {
    affichageGare()
})

document.addEventListener('keydown', function(event) {
    if (event.code === 'Enter') {
        affichageGare()
    }
});