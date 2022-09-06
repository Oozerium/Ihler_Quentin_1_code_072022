//intégrer les produits de l'API dans la page d'accueil
fetch('http://localhost:3000/api/products')
.then(response => {
    switch (response.status) {
        case 200:
            return response.json();
        case 404:
            alert("Page introuvable");
            break;
        case 500:
            alert("Le serveur a rencontré une erreur");
            break;
        default:
            alert("Erreur introuvable");
            break;
    }
})

// Affiche les produits
.then(data => {
   let article = '';
    for(let product of data){
        article += `<a href="./product.html?id=${product._id}">
                        <article>
                            <img src="${product.imageUrl}" alt="${product.altTxt}">
                            <h3 class="productName">${product.name}</h3>
                            <p class="productDescription">${product.description}</p>
                        </article>
                    </a>`;
    }
    document.querySelector('#items').innerHTML = article;
})

.catch(err => console.log('Erreur : ' + err));