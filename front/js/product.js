let idConfig = new URL(window.location.href);
idConfig = idConfig.searchParams.get("id");
console.log(idConfig);


let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit")); //On crée tout de suite la variable pour le localStorage

fetch(`http://localhost:3000/api/products/${idConfig}`) //Forcément, on change avec notre nouvelle variable
    .then(function (response) {
        return response.json();
    })
    .then((kanap) => {

        //********************RECHERCHE DOM ******************//
        let imageUrl = kanap.imageUrl;
        let imageContainer = document.querySelectorAll(".item__img") [0]
        imageContainer.innerHTML+= ` <div class="item__img">
              <img src="${kanap.imageUrl}" alt="${kanap.altTxt}"> 
            </div>`
        let alt = kanap.altTxt;
        document.querySelector(".item__img").alt = alt;
        document.querySelector("#title").innerText = kanap.name
        document.querySelector("#description").innerText = kanap.description

        console.log(imageUrl)


        const select = document.querySelector("#colors")
        console.log(kanap.colors)

        for (i = 0; i < kanap.colors.length; i++) {
            const option = document.createElement("option")
            option.value = kanap.colors [i]
            option.innerText = kanap.colors [i]
            select.appendChild(option)
        }


        let price = kanap.price / 100;
        document.querySelector("#price").innerHTML = price;

        //********************FIN RECHERCHE D0M ******************//



        //********************LOCAL STORAGE******************//
        //Récupérer le bouton ajouter au panier dans le DOM

        let article = document.getElementById("addToCart") //nouveau sélecteur parent pour append le bouton (à faire en dur => HTML)
        const qtyButton = document.getElementById("quantity") //on crée une variable qui pointe sur l'élement qui contient la quantité...

        article.addEventListener("click", (event) => {
            if (qtyButton.value > 0 && qtyButton.value <=100 && select.value != 0){
            window.location.href = "cart.html"

            //************Stocker la récupération des valeurs du formulaire dans le local storage

            // Déclaration de la variable produitEnregistreDansLocalStorage. 
            //Son rôle est de retranscrire en javascript la valeur envoyée par "getItem("produit") en un objet réutilisable.
            let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
            console.log(produitEnregistreDansLocalStorage);


            if(!select.value <=0 ) {
                alert("Vous avez oublié de sélectionner une couleur")
            };



                let optionsProduit = {
                    nom: kanap.name,
                    idProduit: idConfig,
                    couleur: select.value,
                    prix: kanap.price,
                    quantity: qtyButton.value, //...pour récuperer la valeur de la quantité ici
                    image : imageUrl,
                    alt,
                }
                console.log(optionsProduit)

            //Importation dans le local storage
            //Si le panier comporte déjà au moins 1 article
            if (produitEnregistreDansLocalStorage) {
            const resultFind = produitEnregistreDansLocalStorage.find(
                (el) => el.idProduit === idConfig && el.couleur === select.value);
                //Si le produit commandé est déjà dans le panier
                if (resultFind) {
                    let newQuantite =
                    parseInt(optionsProduit.quantity) + parseInt(resultFind.quantity);
                    resultFind.quantity = newQuantite;
                    localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));
                    console.log(produitEnregistreDansLocalStorage);
                    popupConfirmation();
                //Si le produit commandé n'est pas dans le panier
                } else {
                    produitEnregistreDansLocalStorage.push(optionsProduit);
                    localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));
                    console.table(produitEnregistreDansLocalStorage);
                    popupConfirmation();
                }
            //Si le panier est vide
            } else {
                produitEnregistreDansLocalStorage =[];
                produitEnregistreDansLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));
                console.log(produitEnregistreDansLocalStorage);
                popupConfirmation();
            }

            console.log(resultFind)

            
        }})

        //********************FIN LOCAL STORAGE******************//
    })

    //********************FIN DU THEN ((teddy)******************//



    .catch((error) => {
        alert("Une erreur est survenue. Nous allons corriger le problème très prochainement : " + error.message) //Ici, je rajoute le error.message pour avoir une indication sur le problème
    })
