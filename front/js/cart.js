//Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on met les keys qui sont dans le local storage
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
//***JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
console.log(produitEnregistreDansLocalStorage);

if(produitEnregistreDansLocalStorage) {

    //***************AFFICHAGE DES PRODUITS DU PANIER***********************//
    //Sélection de la classe où je vais injecter le code HTML
    const element = document.querySelector("#cart__items");
    console.log(element);

    //Si le panier n'est pas vide , afficher les produits dans le local storage
    let produitpanier = [];
    for ( j = 0; j < produitEnregistreDansLocalStorage.length; j++) {
        produitpanier = produitpanier + 
            `<div class = "recapitulatif-panier">
                <div>Nom : ${produitEnregistreDansLocalStorage[j].nom} - Couleur : ${produitEnregistreDansLocalStorage[j].couleur} - Quantité : ${produitEnregistreDansLocalStorage[j].quantity} </div>  
                <div>${produitEnregistreDansLocalStorage[j].prix/100 + "€"}
            </div>`;

            if (j === produitEnregistreDansLocalStorage.length) {
                //injection html dans la page panier
                element.innerHTML = produitpanier;
            } 

    }

    //******************Gestion du bouton supprimer l'article*****************//


    for (let k = 0; k < article.length; k++) {
        //Création du bouton supprimer
         let article = document.getElementById("order")
        article[k].addEventListener("click", (event) => {
            event.preventDefault();

            //Sélection de l'id du produit qui va être supprimé en cliquant sur le bouton
            let id_supprimer = produitEnregistreDansLocalStorage[k]._id;
            console.log(article);

            //on envoie la variable dans le local storage
            //On transforme la variable au format JSON dans la key "produit" du local storage
            localStorage.setItem("#produit" , JSON.stringify(produitEnregistreDansLocalStorage))

            //alert pour indiquer que le produit a bien été supprimé
            alert("Ce produit a bien été supprimé du panier")


        })
    }

    //******************Montant total du panier*****************//
    //Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier
    let calculprix = [];

    //Aller chercher les prix dans le panier
    for  (let l = 0; l < produitEnregistreDansLocalStorage.length; l++) {

        //conversion du prix et quantité en string
        //ParseInt analyse et convertit une chaine de caractères en un entier
        let prixpanier = parseInt(produitEnregistreDansLocalStorage[l].prix/100);
        console.log(produitEnregistreDansLocalStorage[l].prix/100);

        let qte = parseInt(produitEnregistreDansLocalStorage[l].quantity)
        console.log(produitEnregistreDansLocalStorage[l].quantity)

        //calcul du mettre le prix en fonction de la quantité
        let prixqte = qte*prixpanier;
        console.log(prixqte)

        //mettre les prix du panier dans la variable "calculprix"
        calculprix.push(prixqte);
        console.log(calculprix);

    

        //Additionner les prix dans le tableau de la variable
        const reducer = (accumulator , currentValue) => accumulator + currentValue;
        console.log(reducer);

        const total = calculprix.reduce(reducer);
        console.log(total);
    }
    //Le code HTML du prix total à afficher
    const prixHTML = ` <div class="cart__price">
        <p>Total <span id="totalQuantity"><!-- 2 --></span> : <span id="totalPrice">${total + "€"}</span></p></div>`

    //injection html dans la page panier
    element.insertAdjacentHTML("beforeend", prixHTML );

    


    // On récupère les inputs depuis le DOM.
    let inputName = document.querySelector("#firstName");
    let inputLastName = document.querySelector("#lastName");
    let inputAdress = document.querySelector("#address");
    let inputCity = document.querySelector("#city");
    let inputMail = document.querySelector("#email");

    // le tableau contiendra un tableau d'objet qui sont les produits acheté, et order contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
    let productorder = [];
    for (let m = 0; m <produitEnregistreDansLocalStorage.length ; m++) {
        productorder.push(produitEnregistreDansLocalStorage[m].idConfig)
    };
    console.log(productorder)

    const form = {
        contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
    
        },
        product : [productorder],

    }
    console.log(form)

    let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let regexCodePostal = /[0-9]/;
    let regexAddress = /\d([ ])(\w+[ ]?)+/;

    if  (!firstName.value ||
        !lastName.value ||
        !regexAddress.test(address.value) ||
        !city.value ||
        !regexEmail.test(email.value)){
        console.log("Il manque des valeurs à renseigner");



        const form = {
            contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
    
            },
            product : productorder

        }

        console.log(form)


    }else {
        const product = {
            method: "POST",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" },

        };
        console.log(product)
    


        function commandtoOrder() {


            fetch("http://localhost:3000/api/products/order", product )

                .then(response => response.json())
                .then((infosCommande) => {
                    console.log(infosCommande);

                    //********************RECHERCHE DOM ******************//

                    const count = document.querySelector("#order")
                    console.log(count)


                    //********************FIN RECHERCHE D0M ******************//



                    //********************LOCAL STORAGE******************//
                    //Récupérer le bouton ajouter au panier dans le DOM

                    let article = document.getElementById("order") //nouveau sélecteur parent pour append le bouton (à faire en dur => HTML)
                    article.addEventListener("click", function(e){
                        e.preventDefault

                        //************Stocker la récupération des valeurs du formulaire dans le local storage

                        let opt = {
                            orderId : infosCommande.orderId,
                            prixTotal : total
                        }   

                        console.log(opt);
                        console.log(article);

                        // Déclaration de la variable commandLocalStorage 
                        //Son rôle est de retranscrire en javascript la valeur envoyée par "getItem("toOrder") en un objet réutilisable.
                        let commandLocalStorage = [];
                        commandLocalStorage.push(opt);
                        localStorage.setItem("command", JSON.stringify(commandeLocalStorage));
                        console.log(commandLocalStorage);

                    })


                    //********************FIN LOCAL STORAGE******************//
                })

                //********************FIN DU THEN ******************//


            .catch((error) => {
                alert("Une erreur est survenue. Nous allons corriger le problème très prochainement : " + error.message) //Ici, je rajoute le error.message pour avoir une indication sur le problème
            })
        }

    commandtoOrder();

    }


} else {
//si le panier est vide : afficher le panier vide
    console.log("je suis vide");
    const paniervide = 
        `<div id="panier-vide">
            <div>Le panier est vide</div>  
        </div>`;
        element.innerHTML = paniervide;

    //Création du bouton vider le panier
    let viderButton = document.createElement("button");
    let article = document.getElementById("artAndFormContainer")
    viderButton.textContent = "vider le panier";
    article.appendChild(viderButton);
    
}