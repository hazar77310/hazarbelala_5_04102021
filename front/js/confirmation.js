let commandLocalStorage = JSON.parse(localStorage.getItem("#toOrder"));

//Récupération de l'id de la commande dans le local storage
const responseid = localStorage.getItem("#toOrder");

//Récupération du prix total de la commande
const total = localStorage.getItem("total")
console.log(`total: ${total}`);

//Structure HTML de la page de confirmation

//Selection dans le DOM pour le positionnement
const element = document.querySelector(".confirmation");
const confirmcmd = `
	<p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId">${commandLocalStorage.orderId}</span></p>
    `
console.log(confirmcmd)
element.innerHTML = confirmcmd;

//injection html dans la page panier
element.insertAdjacentHTML("beforebegin", confirmcmd );


