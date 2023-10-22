alert("Bonjour");

// Récupérez le paramètre "gare" de l'URL
const urlParams = new URLSearchParams(window.location.search);
const gareName = urlParams.get("gare");

// Utilisez le nom de la gare pour charger les données de la gare depuis votre API
// Assurez-vous d'effectuer une requête API pour obtenir les informations de la gare en utilisant "gareName".

// Remplissez les éléments HTML avec les données de la gare
document.getElementById("heure-arrivee").textContent = "Heure d'arrivée de la gare";
document.getElementById("direction").textContent = "Direction de la gare";
// Remplissez d'autres éléments avec les informations de la gare