let commandLocalStorage = JSON.parse(localStorage.getItem("#toOrder"));

//Récupération de l'id de la commande dans le local storage
const responseid = localStorage.getItem("#toOrder");

//Récupération du prix total de la commande
const total = localStorage.getItem("total")
console.log(`total: ${total}`);

//Structure HTML de la page de confirmation

//Selection dans le DOM pour le positionnement
const element = document.querySelector("recapitulatif-commande");
const confirmcmd = `
	<h1>Récapitulatif de votre commande</h1> 

        <div class="recap">
            <p>Merci pour votre commande</p>
            <p>Votre commande numéro : ${responseid} a bien été pris en compte</p>
            <p>Le montant de votre commande est de :  €</p>
            <p class="gras">Au plaisir de vous revoir</p>
        </div> 
    `
console.log(confirmcmd)
element.innerHTML = confirmcmd;

//injection html dans la page panier
element.insertAdjacentHTML("beforebegin", confirmcmd );


