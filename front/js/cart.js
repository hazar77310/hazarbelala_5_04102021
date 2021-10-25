//Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on met les keys qui sont dans le local storage
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
//***JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JavaScript
console.log(produitEnregistreDansLocalStorage);


if(produitEnregistreDansLocalStorage) {

    //***************AFFICHAGE DES PRODUITS DU PANIER***********************//
    //Sélection de la classe où je vais injecter le code HTML
    const element = document.querySelector("#cart__items");
    console.log(element);


    for (let produit in produitEnregistreDansLocalStorage){


        //Création du html
        const cart = document.querySelector("#cart__items");
        const article = document.createElement('article');
        cart.appendChild(article);
        article.classList.add("cart__item");
        article.setAttribute('data-id', produitEnregistreDansLocalStorage[produit].idProduit);
        const img = document.createElement('div');
        article.appendChild(img);
        img.classList.add("cart__item__img");
        img.src = produitEnregistreDansLocalStorage[produit].image;
        img.alt = produitEnregistreDansLocalStorage[produit].alt;
        article.appendChild(img);
        const content = document.createElement('div');
        content.classList.add("cart__item__content");
        article.appendChild(content);
        const subsub = document.createElement('div');
        subsub.classList.add("cart__item__content__titlePrice");
        content.appendChild(subsub);
        const h2 = document.createElement('h2');
        subsub.appendChild(h2);
        h2.innerHTML = produitEnregistreDansLocalStorage[produit].nom;
        const p = document.createElement('p');
        subsub.appendChild(p);
        p.innerHTML = `${produitEnregistreDansLocalStorage[produit].prix /100 + "€"}`;
        const settings = document.createElement('div');
        settings.classList.add("cart__item__content__settings");
        content.appendChild(settings);
        const quantitycart = document.createElement('div');
        quantitycart.classList.add("cart__item__content__settings__quantity");
        settings.appendChild(quantitycart);
        const pqty = document.createElement('p');
        quantitycart.appendChild(pqty);
        pqty.textContent = "Qté : " ;
        var input = document.createElement("INPUT");
        input.setAttribute("type", "number");
        input.classList.add("itemQuantity");
        input.name = "itemQuantity";
        input.min = "1";
        input.max = "100";
        input.value = produitEnregistreDansLocalStorage[produit].quantity;
        quantitycart.appendChild(input);
        input.onchange = updatequantity();
        const deletecart = document.createElement('div');
        deletecart.classList.add("cart__item__content__settings__delete");
        settings.appendChild(deletecart);
        const pdelete = document.createElement('p');
        pdelete.classList.add("deleteItem");
        pdelete.innerHTML = "Supprimer";
        deletecart.appendChild(pdelete);

        var couleur = `${produitEnregistreDansLocalStorage.couleur}`
        console.log(couleur)
    }
    
    function updatequantity(){

        var idProduit = `${produitEnregistreDansLocalStorage.idProduit}`
        console.log(idProduit)
        const el = document.querySelector('.cart__item');
        el.dataset.id === idProduit;


        // Récupération du total des quantités
        var qty = document.getElementsByClassName('itemQuantity');
        totalQty = 0;

        total = 0;

        let totalQuantity = document.getElementById('totalQuantity');
        totalQuantity.innerHTML = totalQty;
        console.log(totalQty);

        // Récupération du prix total

        for (var i = 0; i < qty.length; ++i) {
            total += (qty[i].value * produitEnregistreDansLocalStorage[i].prix);
            
            totalQty += qty[i].value;

        }

        let totalPrice = document.getElementById('totalPrice');
        totalPrice.innerHTML = `${total/100 }`
        console.log(total);


        // Modification d'une quantité de produit

        let qtyModif = document.querySelectorAll(".itemQuantity");

        for (let k = 0; k < qtyModif.length; k++){
            qtyModif[k].addEventListener("change" , (event) => {
                event.preventDefault();

                //Selection de l'element à modifier en fonction de son id ET sa couleur
                let quantityModif = produitEnregistreDansLocalStorage[k].quantity;
                let qtyValue = qtyModif[k].value;
            
                const resultFind = produitEnregistreDansLocalStorage.find((el) => el.qtyValue !== quantityModif);

                resultFind.quantity = qtyValue;
                produitEnregistreDansLocalStorage[k].quantity = resultFind.quantity;

                localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));
        
                // refresh rapide
                location.reload();

            })
        }
    }
    updatequantity();
    console.log(updatequantity);

    // Suppression d'un produit
    function deleteProduct() {
        let supprimer = document.querySelectorAll("deleteItem");

        for (let a = 0; a < supprimer.length; a++){
            supprimer[a].addEventListener("click" , (event) => {
                event.preventDefault();

                const el = document.querySelector('.cart__item');
                var elt = el.closest
                console.log(elt)

                var idProduit = `${produitEnregistreDansLocalStorage[a].idProduit}`
                console.log(idProduit)
                el.dataset.id === idProduit;

                //Selection de l'element à supprimer en fonction de son id ET sa couleur
                let idDelete = produitEnregistreDansLocalStorage[a].idProduit;
                let colorDelete = produitEnregistreDansLocalStorage[a].couleur;

                produitEnregistreDansLocalStorage = produitEnregistreDansLocalStorage.filter( el => el.idProduit !== idDelete || el.couleur !== colorDelete );
            
                localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));

                //Alerte produit supprimé et refresh
                alert("Ce produit a bien été supprimé du panier");
                location.reload();
            })
        }
    }
    deleteProduct();
    console.log(deleteProduct)



    
    const command= document.getElementById("order") //nouveau sélecteur parent pour append le bouton (à faire en dur => HTML)
    command.addEventListener("click", (event) =>{

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
  
        }

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
                    .then((data) => {
                    console.log(data);

                        //********************RECHERCHE DOM ******************//

                        const count = document.querySelector("#order")
                        console.log(count)


                        //********************FIN RECHERCHE D0M ******************//



                        //********************LOCAL STORAGE******************//
                        //Récupérer le bouton ajouter au panier dans le DOM

                        

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


                            localStorage.setItem("command", data.orderId);

                            document.location.href = "confirmation.html";

                    


                        //********************FIN LOCAL STORAGE******************//
                    

                    //********************FIN DU THEN ******************//
                    })


                    .catch((error) => {
                        alert("Une erreur est survenue. Nous allons corriger le problème très prochainement : " + error.message) //Ici, je rajoute le error.message pour avoir une indication sur le problème
                    })
                
            }

        commandtoOrder();
        }   


    })

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