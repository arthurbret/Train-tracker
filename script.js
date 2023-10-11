const input = document.querySelector('#input-gare');
const bouton = document.querySelector('#recherche');
let gareDemande = 0;

bouton.addEventListener('click', () => {
    gareDemande = document.getElementById('input-gare').value
    console.log(gareDemande)
})
