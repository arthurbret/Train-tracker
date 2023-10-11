const input = document.querySelector('#input-gare');
const bouton = document.querySelector('#recherche');
const urlApiSncf = "https://api.sncf.com"
const urlDataSncf = "https://data.sncf.com"
const headers = {
    "Authorization" : "6d992b49-f48d-4c16-a560-6994483ae0b2"
}
let gareDemande = 0;

const getDataSncf = async (url) => {
    const data = await fetch(url)
    const json = data.json()
    return json
}



async function getUicCodeSncf(url, gare) {
    try {
        const data = await getDataSncf(url + "/api/explore/v2.1/catalog/datasets/referentiel-gares-voyageurs/records?limit=20&refine=gare_alias_libelle_fronton%3A" + gare);
        return data.results[0].uic_code;
    } catch (error) {
        console.error(error);
    }
}

bouton.addEventListener('click', async() => {
    gareDemande = document.getElementById('input-gare').value
    console.log(gareDemande)
    try {
        const retour = await getUicCodeSncf(urlDataSncf, gareDemande);
        console.log(retour);
    } catch (error) {
        console.error(error);
    }
})