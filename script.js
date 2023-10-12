const input = document.querySelector('#input-gare');
const bouton = document.querySelector('#recherche');
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

bouton.addEventListener('click', async() => {
    gareDemande = document.getElementById('input-gare').value
    console.log(gareDemande)
    try {
        const UIC = (await getUicCodeSncf(urlDataSncf, gareDemande)).slice(2)
        console.log(UIC)
        const dataApi = await getInfoApi(urlApiSncf, UIC)
        console.log(dataApi)
    } catch (error) {
        console.error(error)
    }
})