//on initialise les variables

let kanap 
let $produit = document.querySelector('#items');

//appel de l'API

fetch("http://localhost:3000/api/products")
    .then(function (response) {
        //utilisation de then pour récupérer une promesse qui va nous donner une réponse
        return response.json() //type de format réponse en json
    })
    .then(function (articles) {
        articles.forEach((elem) => main(elem))
    })
    .catch(function (error) {
        alert(
            "Une erreur est survenue. Nous allons corriger le problème très prochainement"
        )
    })


//Appel URL
const params = document.location;
console.log(params);

function main(kanap) {
  let newDiv =document.createElement("div")
  newDiv.innerHTML =
    `
        <section class="items" id="items"> 
           <a href="./product.html?id=${kanap._id}">
            <article>
              <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
              <h3 class="productName">"${kanap.name}"</h3>
              <p class="productDescription">"${kanap.description}"</p>
            </article>
          </a> 
        </section>
      </div>
    </main>`
    $produit.appendChild(newDiv)


console.log(newDiv)

}
