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
    for ( j = 0; j < produitEnregistreDansLocalStorage.length; j++) {
        produitpanier =  
            `<table width = "50%", border 3px >
             <thead>
            <tr><th>NOM</th><th>COULEUR</th><th>QUANTITE</th><th>PRIX</th></tr>
            </thead>
            <tbody>
            <tr>
                <td>${produitEnregistreDansLocalStorage[j].nom}</td>
                <td>${produitEnregistreDansLocalStorage[j].couleur}</td>
                <td><input id="tdInputNumber" type="number" value="${produitEnregistreDansLocalStorage[j].quantity}" min="1" onchange="updateQuantity('${produitEnregistreDansLocalStorage[j].idProduit}', this.value)"></td>>
                <td>${produitEnregistreDansLocalStorage[j].prix/100}€</td>
                <td><button onclick="deletelign('${produitEnregistreDansLocalStorage[j].idProduit}')">&#x274C;</button></td>
            </tr>
            </table>`

        console.log(produitpanier)

            //injection html dans la page panier
            element.innerHTML += produitpanier; 
    }

   // deletelign = () =>{

 //       if (!localStorage.getItem('#produit')){
 //           return 
 //       }
//    let shoppingCart = JSON.parse(localStorage.getItem('#produit'));
 //   for (let n=0 ; n < shoppingCart.length ; n++){  
 //   document.querySelector("#deletetem").addEventListener('click', () =>{   
 //       shoppingCart.splice(n, 1);
 //       localStorage.setItem(`produit`, JSON.stringify(produit));
  //      document.location.reload(true);
 //   console.log(shoppingCart)   
  //  })
    
  //  }
  //  }


 //   deletelign()



    

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
        prixHTML.textContent = `Total : ${total/100 + " €"} `

 
        //Fonction qui modifie la quantité directement sur la page du panier et mets à jour le prixTotal
    function updateQuantity(idProduit, valueQuantity){
    json[idProduit].quantity = valueQuantity
    json[idProduit].priceTotal = json[idProduit].quantity * json[idProduit].price
    document.getElementById(`Total-${json[idProduit]._id}`).innerHTML = `${json[idProduit].total / 100} €`
    localStorage.setItem("cart", JSON.stringify(json))
}
    


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
    produitEnregistreDansLocalStorage === null || produitEnregistreDansLocalStorage == 0 
    //si le panier est vide : afficher le panier vide
    console.log("je suis vide");
    const paniervide = 
        `<div id="panier-vide">
            <div>Le panier est vide</div>  
        </div>`;
        element.innerHTML = paniervide;

    console.log(paniervide)


    
}