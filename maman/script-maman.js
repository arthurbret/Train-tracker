const container = document.querySelector('#train-container');
const nomGare = document.querySelector('#nom-gare');
const urlApiSncf = "https://api.sncf.com";
const urlDataSncf = "https://data.sncf.com";
const headers = {
    "Authorization" : "6d992b49-f48d-4c16-a560-6994483ae0b2"
}
let gareDemande;

// Fonction qui calcule le temps de retard en minutes
function calculRetard(horaireTheorie, horairePratique) {
    const dateTheorie = new Date(horaireTheorie);
    const datePratique = new Date(horairePratique);
    const diffMs = datePratique - dateTheorie;
    const diffMin = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return diffMin;
}

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

// Fonction qui fetch le json d'un url sans header
const getWithoutHeader = async (url) => {
    const data = await fetch(url)
    const json = data.json()
    return json
}

// Fonction qui fetch le json d'un url avec header (token auth api sncf)
const getWithHeader = async (url) => {
    const data = await fetch(url, {
        headers: headers
    })
    const json = data.json()
    return json
}

// Fonction qui renvoie le code UIC d'une gare
async function getidSncf(url, gare) {
    try {
        const data = await getWithoutHeader(url + "/api/explore/v2.1/catalog/datasets/referentiel-gares-voyageurs/records?limit=20&refine=gare_alias_libelle_fronton%3A" + gare)
        return data.results[0].uic_code
    } catch (error) {
        console.error(error)
    }
}

// Fonction qui renvoie les infos d'une gare en fonction de son code UIC
async function getInfoApi(url, id) {
    try {
        console.log(url + "/v1/coverage/sncf/stop_areas/stop_area%3ASNCF%3A" + id + "/departures?")
        const data = await getWithHeader(url + "/v1/coverage/sncf/stop_areas/" + id + "/departures?count=10&")
        return data
    } catch (error) {
        console.error(error)
    }
}

async function getSuggestions(url, query) {
    try {
        console.log(url + "/v1/coverage/sncf/pt_objects?q=" + query + "&type%5B%5D=stop_point&")
        const data = await getWithHeader(url + "/v1/coverage/sncf/pt_objects?q=" + query + "&type%5B%5D=stop_area&")
        return data
    } catch (error) {
        console.error(error)
    }
}

// Fonction qui affiche les trains en fonction de la gare demandée
async function affichageGare(){
    console.log("Gare :",(nomGare.innerHTML))
    gareDemande = await getSuggestions(urlApiSncf, nomGare.innerHTML)
    const idGare = gareDemande.pt_objects[0].id
    console.log("data :",idGare)
    try {
        const dataApi = await getInfoApi(urlApiSncf, idGare)
        console.log(dataApi)
        container.innerHTML = ""
        dataApi.departures.forEach((element) => {
            console.log(element.display_informations.headsign)
            let retard = "black"
            if (element.stop_date_time.data_freshness == "base_schedule") {
                retard = "green-500"
                container.innerHTML += 
                `<div class="p-2 md:w-full cursor-pointer">
                    <div class="h-full border-2 border-gray-300 border-opacity-60 rounded-lg overflow-hidden">
                        <div class="flex flex-row flex-center items-center gap-3 ml-2">
                            <div id="typeTransport" class="align-middle bg-red-100 gap-2">

                            </div>
                            <div class="colored-dot w-[10px] h-[10px] bg-${retard} rounded-full"></div>
                            <h1 class="title-font text-lg font-medium text-gray-900">${getHour(element.stop_date_time.arrival_date_time)}</h1>
                            <p class="leading-relaxed">${element.display_informations.direction}</p>
                        </div>
                    </div>
                </div>`
            } else if ((element.stop_date_time.data_freshness == "realtime") && (element.base_departure_date_time)) {
                retard = "orange-500"
                container.innerHTML += 
                `<div class="p-2 md:w-full cursor-pointer">
                    <div class="h-full border-2 border-gray-300 border-opacity-60 rounded-lg overflow-hidden">
                        <div class="flex flex-row flex-center items-center gap-3 ml-2">
                            <div class="colored-dot w-[10px] h-[10px] bg-${retard} rounded-full"></div>
                            <p>${calculRetard(element.stop_date_time.base_departure_date_time,element.stop_date_time.departure_date_time)}</p>
                            <h1 class="title-font text-lg font-medium text-gray-900 line-through">${getHour(element.stop_date_time.base_departure_date_time)}</h1>
                            <h1 class="title-font text-lg font-medium text-gray-900">${getHour(element.stop_date_time.departure_date_time)}</h1>
                            <p class="leading-relaxed">${element.display_informations.direction}</p>
                        </div>
                    </div>
                </div>`
            }
        });
    } catch (error) {
        console.error(error)
    }
}

affichageGare()