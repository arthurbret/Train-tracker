const input = document.querySelector('#input-gare');
const bouton = document.querySelector('#recherche');
const container = document.querySelector('#train-container');
const urlApiSncf = "https://api.sncf.com";
const urlDataSncf = "https://data.sncf.com";
const headers = {
    "Authorization" : "6d992b49-f48d-4c16-a560-6994483ae0b2"
}
let gareDemande;

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
            container.innerHTML += 
            `<div class="p-2 md:w-full cursor-pointer">
                <div class="h-full border-2 border-gray-300 border-opacity-60 rounded-lg overflow-hidden">
                    <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="https://cdn-s-www.leprogres.fr/images/3C7DB6B7-ADA5-44AE-8643-DF835FB5008D/NW_raw/la-prochaine-reunion-publique-aura-lieu-a-montrottier-ce-jeudi-25-mai-photo-d-illustration-progres-redouja-merabti-1684962342.jpg" alt="burger image"></img>
                    <div class="p-6">
                        <h1 class="title-font text-lg font-medium text-gray-900 mb-3">${element.display_informations.headsign}</h1>
                        <p class="leading-relaxed mb-3">${element.display_informations.direction}</p>
                        <div class="flex items-center flex-wrap"></div>
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