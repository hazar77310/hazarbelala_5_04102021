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
        document.querySelector(".item__img").src = imageUrl;
        let imagealt = kanap.altTxt;
        document.querySelector(".item__img").alt = imagealt;
        document.querySelector("#title").innerText = kanap.name
        document.querySelector("#description").innerText = kanap.description

        console.log(kanap.imageUrl)


        const select = document.querySelector("#colors")
        console.log(kanap.colors)

        for (i = 0; i <= kanap.colors.length; i++) {
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
        article.addEventListener("click", function(e){
            e.preventDefault
            window.location.href = "cart.html"

            //************Stocker la récupération des valeurs du formulaire dans le local storage

            // Déclaration de la variable ProduitLocalStorage. 
            //Son rôle est de retranscrire en javascript la valeur envoyée par "getItem("produit") en un objet réutilisable.
            let produitLocalStorage = JSON.parse(localStorage.getItem("#produit"));
            console.log(produitLocalStorage);

            const qtyButton = document.getElementById("quantity") //on crée une variable qui pointe sur l'élement qui contient la quantité...

                let optionsProduit = {
                    nom: kanap.name,
                    idProduit: idConfig,
                    couleur: select.value,
                    prix: kanap.price,
                    quantity: qtyButton.value, //...pour récuperer la valeur de la quantité ici
                    image : imageUrl,
                    alt = imagealt,
                }
                console.log(optionsProduit)

            if (produitEnregistreDansLocalStorage) {
                produitEnregistreDansLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));
                console.log(produitEnregistreDansLocalStorage);

            } else {
                produitEnregistreDansLocalStorage = [];
                produitEnregistreDansLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitEnregistreDansLocalStorage));
                console.log(produitEnregistreDansLocalStorage);

            }
        })

        //********************FIN LOCAL STORAGE******************//
    })

    //********************FIN DU THEN ((teddy)******************//



    .catch((error) => {
        alert("Une erreur est survenue. Nous allons corriger le problème très prochainement : " + error.message) //Ici, je rajoute le error.message pour avoir une indication sur le problème
    })