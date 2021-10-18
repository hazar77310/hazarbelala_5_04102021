//Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on met les keys qui sont dans le local storage
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
//***JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
console.log(produitEnregistreDansLocalStorage);


if(produitEnregistreDansLocalStorage) {

    //***************AFFICHAGE DES PRODUITS DU PANIER***********************//
    //Sélection de la classe où je vais injecter le code HTML
    const element = document.querySelector("#cart__items");
    console.log(element);

    let total = 0;

    //Si le panier n'est pas vide , afficher les produits dans le local storage
    let produitpanier = [];
    let panier = [];
    for ( j = 0; j < produitEnregistreDansLocalStorage.length; j++) {
        produitpanier =  
            ` <article class="cart__item" data-id="${produitEnregistreDansLocalStorage[j].idProduit}">
                <div class="cart__item__img">
                  <img src="${produitEnregistreDansLocalStorage[j].image}" alt="${produitEnregistreDansLocalStorage[j].alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${produitEnregistreDansLocalStorage[j].nom}</h2>
                    <p>${produitEnregistreDansLocalStorage[j].prix/100 + "€"}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1" onchange = "updatequantity(event)">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
            </article>`


        console.log(produitpanier)

            //injection html dans la page panier
            element.innerHTML += produitpanier; 

   
    }



    

    //******************Montant total du panier*****************//
    //Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier
    let calculprix = [];

        //Aller chercher les prix dans le panier
        for  (let l = 0; l < produitEnregistreDansLocalStorage.length; l++) {
            let prixpanier = produitEnregistreDansLocalStorage[l].prix;
            console.log(prixpanier);

            //mettre les prix du panier dans la variable "calculprix"
            calculprix.push(prixpanier);
            console.log(calculprix);

    

            //Additionner les prix dans le tableau de la variable
            const reducer = (accumulator , currentValue) => accumulator + currentValue;
            console.log(reducer);
            total = calculprix.reduce(reducer);
            console.log(total);

        }

        let  prixHTML = document.getElementById("totalPrice")
        console.log(prixHTML);

        //Le code HTML du prix total à afficher
        prixHTML.textContent = `${total/100 + " €"} `

 
    //Création de la fonction panier
    const cart = document.querySelector("#cart__items")
    cart.innerHtml = document.write("<article class=\"cart__item\" data-id=\"{product-ID}\">\r\n                <div class=\"cart__item__img\">\r\n                  <img src=\"\" alt=\"\">\r\n                <\/div>\r\n                <div class=\"cart__item__content\">\r\n                  <div class=\"cart__item__content__titlePrice\">\r\n                    <h2>Nom du produit<\/h2>\r\n                    <p>42,00 \u20ac<\/p>\r\n                  <\/div>\r\n                  <div class=\"cart__item__content__settings\">\r\n                    <div class=\"cart__item__content__settings__quantity\">\r\n                      <p>Qt\u00e9 : <\/p>\r\n                      <input type=\"number\" class=\"itemQuantity\" name=\"itemQuantity\" min=\"1\" max=\"100\" value=\"42\">\r\n                    <\/div>\r\n                    <div class=\"cart__item__content__settings__delete\">\r\n                      <p class=\"deleteItem\">Supprimer<\/p>\r\n                    <\/div>\r\n                  <\/div>\r\n                <\/div>\r\n              <\/article>");

    function updatequantity() {

        const submit = document.querySelectorAll(".itemQuantity")
        console.log(submit)
        submit.forEach(item =>  { 

        var idProduit = `${produitEnregistreDansLocalStorage.idProduit}`
        console.log(idProduit)
        el.dataset.id === idProduit;

        var couleur = `${produitEnregistreDansLocalStorage.couleur}`
        console.log(couleur)

        var quantity = `${produitEnregistreDansLocalStorage.quantity}`
        console.log(quantity)



            //Si le panier comporte déjà au moins 1 article
            const resultFind = produitEnregistreDansLocalStorage.find(
                (el) => el.idProduit === idProduit && el.couleur === couleur);
                //Si le produit commandé est déjà dans le panier
                if (resultFind) {
                    let newQuantite = document.querySelector("itemQuantity").value
                    parseInt(quantity) + parseInt(resultFind.quantity);
                    console.log(quantity)
                    console.log(resultFind.quantity)
                    resultFind.quantity = newQuantite;
                    localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));

                }



        })
    }
        

    console.log(updatequantity)


    const supprimer = document.querySelectorAll("deleteItem")
    supprimer.forEach(item => item.addEventListener("click" , function(e) {
        e.preventDefault
        const el = document.querySelector('.cart__item');
        var elt = el.closest
        var idProduit = `${produitEnregistreDansLocalStorage.idProduit}`
        console.log(idProduit)
        el.dataset.id === idProduit;
        console.log(el)
        console.log(elt)
        console.log(el.dataset.id)
        console.log(supprimer)

    }));
    
    


    // On récupère les inputs depuis le DOM.
    let inputName = document.querySelector("#firstName");
    let inputLastName = document.querySelector("#lastName");
    let inputAdress = document.querySelector("#address");
    let inputCity = document.querySelector("#city");
    let inputMail = document.querySelector("#email");

    // le tableau contiendra un tableau d'objet qui sont les produits acheté, et order contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
    let productorder = [];
    for (let m = 0; m <produitEnregistreDansLocalStorage.length ; m++) {
        productorder.push(produitEnregistreDansLocalStorage[m].idProduit)
        productorder.push(produitEnregistreDansLocalStorage[m].nom)
        productorder.push(produitEnregistreDansLocalStorage[m].couleur)
        productorder.push(produitEnregistreDansLocalStorage[m].quantity)
        productorder.push(produitEnregistreDansLocalStorage[m].prix)
        productorder.push(produitEnregistreDansLocalStorage[m].image)
        productorder.push(produitEnregistreDansLocalStorage[m].alt)
        
  
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





    }else {
        const product = {
            method: "POST",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" },

        };
        console.log(product)
    


        function commandtoOrder() {
            const supprimer = document.querySelector("#order")
            const btn = ` <div class="cart__order__form__submit">
                  <input type="button" value="Commander !" id="order">
                </div>`

            supprimer.innerHTML(btn)

            supprimer.addEventListener("click", function (e) {
                e.preventDefault
                window.location.href="confirmation.html";


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
                
            })

        commandtoOrder();


        }

     }


} else {
    produitEnregistreDansLocalStorage === null || produitEnregistreDansLocalStorage == 0 
    //si le panier est vide : afficher le panier vide
    console.log("je suis vide");
    const element = document.querySelector("#cart__items")
    const paniervide = 
        `<div id="panier-vide">
            <div>Le panier est vide</div>  
        </div>`;
        element.innerHTML = paniervide;

    console.log(paniervide)


    
}