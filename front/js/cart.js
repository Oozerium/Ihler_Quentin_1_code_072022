


// affichage contenu panier
const cartMain = document.getElementById('cart__items');
const cartDiv = document.createElement('div');
cartMain.appendChild(cartDiv);
cartDiv.className = 'cart__item_img';
// const kanapApi =  fetch(`http://localhost:3000/api/products/`).then(prod => prod.map(prod))
const idApi = () => {
  // Promise.all(`http://localhost:3000/api/products/`).then(res => res.map(res))
  fetch(`http://localhost:3000/api/products/`)
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
  .then(allProducts => {
      // Récupérer tous les produits de l'API
      for (let i of allProducts){
          AllProdjsonucts.push(i)
      };
     
      // boucle pour récupérer les valeurs des produits du panier
      for(let p of cart.basket) {
          // récupérer les id pour le POST
          products.push(p.id);
          // retrouver dans les produits de l'API, les produits du panier
          let product = allProducts.find(product => product._id == p.id);
      
          // afficher cart__item pour chaque produit
          displayCartItem(product, p); 
    }})
}




// gérer l'affichage du panier et de la page confirmation
let queryActualUrl = window.location.href


 // tableau pour récupérer les id des produits
let products = new Array();
// initialiser la variable du prix total des articles
let AllProducts = new Array();
// afficher les produits du panier
displayCart = () => {
    console.log("Affichage panier");
    // récupérer les produits de l'API
    fetch(`http://localhost:3000/api/products/`)
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
    .then(allProducts => {
        // Récupérer tous les produits de l'API
        for (let i of allProducts){
            AllProducts.push(i)
        };
       
        // boucle pour récupérer les valeurs des produits du panier
        for(let p of cart.basket) {
            // récupérer les id pour le POST
            products.push(p.id);
            // retrouver dans les produits de l'API, les produits du panier
            let product = allProducts.find(product => product._id == p.id);
        
            // afficher cart__item pour chaque produit
            displayCartItem(product, p);
              
        }
        listenInputQuantity();
        listenDelete();  
        getTotalPrice(); 
        getTotalArticles();
    })
    .catch(error => console.log("Erreur : " + error))

    
};

// fonction pour générer les éléments du DOM à ajouter
let dom_utils = {};
(function(context){
    // objet avec propriétés d'un élément
    context.creatEl = function(o) {
        let type = o.type ||'div';
        let el = document.createElement(type);
            for(const key of (Object.keys(o))) {
                if(key != 'attrs' && key != 'type') {
                    el[key] = o[key];
                }
            }
            if(o.attrs) {
                for(let key of (Object.keys(o.attrs))) {
                    let value = o.attrs[key];
                    if(key != key.toLowerCase()) {
                        key = key.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
                    }
                    el.setAttribute(key, value);
                }
            }
            return el;    
    };
    
})(dom_utils);

//générer le code d'un article du panier 

displayCartItem = (product, p) => {
    function initArticle(p) {
        let parent = document.querySelector('#cart__items');
    
        let articleItem = dom_utils.creatEl({
            type: 'article',
            className: 'cart__item',
            attrs:{
                dataId: p.id,
                dataColor: p.option_produit,
            }
        });
        parent.appendChild(articleItem);
    }
    //la div img
    function initDivImage(product) {
        let parents = document.querySelectorAll('.cart__item');
        let last = parents[parents.length -1]
    
        let imgDivItem = dom_utils.creatEl({
            className: 'cart__item__img',
            innerHTML: `<img src="${product.imageUrl}" alt="${product.altTxt}">`
        });
        last.appendChild(imgDivItem);
    }
    // la div content
    function initDivContent() {
        let imageItems = document.querySelectorAll('.cart__item');
        let last = imageItems[imageItems.length -1]
        let divContent = dom_utils.creatEl({
            className: 'cart_item_content',
        });
        last.appendChild(divContent);
    }
    // la div description

    function initDescription(p, product) {
        let parents = document.querySelectorAll('.cart_item_content');
        let last = parents[parents.length -1];
        let displayPrice = product.price * p.quantity;
    
        let itemDesc = dom_utils.creatEl({
            className: 'cart_itemcontent_description',
            innerHTML: `<h2>${product.name}</h2><p>${p.option_produit}</p><p class="item__price">${displayPrice} €</p>`
        });
        last.appendChild(itemDesc);
    }
    
    // la div settings
    function initSettings() {
        let parents = document.querySelectorAll('.cart_item_content');
        let last = parents[parents.length -1]
    
        let itemSettings = dom_utils.creatEl({
            className: 'cart_itemcontent_settings',
        });
        last.appendChild(itemSettings);
    };
    // la div quantity
    function initSetQuantity(p) {
        let parents = document.querySelectorAll('.cart_itemcontent_settings');
        let last = parents[parents.length -1]
    
        let itemSetQuantity = dom_utils.creatEl({
            className: 'cart_itemcontentsettings_quantity',
            innerHTML: `<p>Qté : </p>`,
        });
        last.appendChild(itemSetQuantity);
    };
    // l'input itemQuantity
    function initInputQty(p) {
        let parents = document.querySelectorAll('.cart_itemcontentsettings_quantity');
        let last = parents[parents.length -1]
        let itemInputQuantity = dom_utils.creatEl({
            type: 'input',
            className: 'itemQuantity',
            attrs:{
                type: 'number',
                name: 'itemQuantity',
                min: '1',
                max: '100',
                value: `${p.quantity}`,
            }
        });
        last.appendChild(itemInputQuantity);
    };
    // la div delete 
    function initSetDelete(p) {
        let parents = document.querySelectorAll('.cart_itemcontent_settings');
        let last = parents[parents.length -1]
        let itemSetDelete = dom_utils.creatEl({
            className: 'cart_itemcontentsettings_delete',
            innerHTML: '<p class="deleteItem">Supprimer</p>',
        });
        last.appendChild(itemSetDelete);
    };
    // appel de toutes les balises de l'article
    initArticle(p);
    initDivImage(product);
    initDivContent();
    initDescription(p, product);
    initSettings();
    initSetQuantity(p);
    initInputQty(p);
    initSetDelete(p);
}

// afficher le prix total
const getTotalPrice = () => {
    let total = 0;
    products = [];
    for(let p of cart.basket) {
        let prod = AllProducts.find(prod => prod._id == p.id);
        products.push(p.id);
        total += p.quantity * prod.price;
    }
    const totalPrice = document.querySelector('#totalPrice');
    totalPrice.textContent = total;
}

// affichage et calcul du total des articles :
const getTotalArticles = () => {
    const totalArticles = document.querySelector('#totalQuantity');
    totalArticles.textContent = cart.getNumberProduct();  
}
// changer le prix d'un article sur la page panier
const oneArticleTotal = (id, color) => {
    let element = document.querySelectorAll('.cart__item');
    let p = cart.basket.find(p => p.id == id && p.option_produit == color);
    let prod = AllProducts.find(prod => prod._id == p.id);
    console.log(element);
    for(e of element) {
        if(e.dataset.id == id && e.dataset.color == color){
            console.log(e.dataset.id)
            let elementPrice = e.querySelector('.item__price');
            console.log(elementPrice);
            elementPrice.textContent = `${p.quantity * prod.price} €`;
        }  
    }
}


// modification du nombre d'items :
const listenInputQuantity = () => {
    // //sélectionner tous les input number
    let inputNumber = document.querySelectorAll('input[type=number].itemQuantity');
    //boucle pour récupérer les modifications de quantité sur le panier
    for (let j of inputNumber) {
        j.addEventListener('change', (event) => {
            // récupérer la nouvelle valeur:
            let newArticleQuantity = event.target.value;
            console.log(newArticleQuantity);
            if(newArticleQuantity > 100) {
                alert(`Veuillez indiquer un nombre inférieur à 100`)
            }
            //récupérer l'id et la couleur de l'article modifié
            let changedArticle = j.closest(".cart__item");
            let changedArticleId = changedArticle.dataset.id;
            let changedArticleColor = changedArticle.dataset.color;
            //retrouver dans les produits, le produit dont la valeur doit être modifiée dans le panier
            let changingArticle = cart.findProduct(changedArticleId, changedArticleColor);
            //console.log(cart);
            console.log(changingArticle);
            // modifier la quantité dans le panier
            cart.changeQuantity(changingArticle, newArticleQuantity);
            console.log(newArticleQuantity);
            // modifier le prix dans le DOM 
            //console.log(document.querySelector('.item__price'));
            
            oneArticleTotal(changedArticleId, changedArticleColor);           
            getTotalArticles();
            getTotalPrice();
            
        });
        
    }
}


// suppression d'un article du panier
const listenDelete = () => {
    let delete_btn = document.querySelectorAll('.deleteItem');
    for(let k of delete_btn) {
        k.addEventListener('click', () => {
            //récupérer son id et sa couleur :
            
            if(window.confirm(`Voulez-vous vraiment supprimer ce produit du panier ? \nSupprimer l'article : OK ou le conserver : ANNULER`)){
                let idToDelete = k.closest(".cart__item").dataset.id;
                let colorToDelete = k.closest(".cart__item").dataset.color;
                // trouver la référence de l'article à supprimer
                let removingItem = cart.findProduct(idToDelete, colorToDelete);
                // supprimer l'article du localStorage et du DOM
                cart.remove(removingItem);
                if (cart.length > 0){
                    document.querySelector('#cart_items').removeChild(k.closest(".cart_item"));
                   
                    
                } else {
                      let sectionArticles = document.querySelector('#cart__items');
                      sectionArticles.innerHTML = "<h2>Votre panier est vide</h2>";
                    
                } 
                getTotalArticles();
                getTotalPrice();
                    
            }
            
        });
    }
}

let urlToDisplay = queryActualUrl.split('/')
if(urlToDisplay[urlToDisplay.length-1].startsWith('confirmation')) {
    displayConfirmation()
}else{
    displayCart()
}



// variables pour le formulaire
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const ville = document.getElementById("city");
const adresse = document.getElementById("address");
const mail = document.getElementById("email");




// email
const emailErrorMsg = document.getElementById("emailErrorMsg");
function validateEmail(mail) {
  const regexMail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexMail.test(mail) == false) {
    return false;
  } else {
    emailErrorMsg.innerHTML = null;
    return true;
  }
}
// caractères acceptés pour les noms et prénoms
const regexName = /^[a-zA-Z\-]+$/;

// prenom
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function validateFirstName(prenom) {
  if (regexName.test(prenom) == false) {
    return false;
  } else {
    firstNameErrorMsg.innerHTML = null;
    return true;
  }
}

// nom de famille
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
function validateLastName(nom) {
  if (regexName.test(nom) == false) {
    return false;
  } else {
    lastNameErrorMsg.innerHTML = null;
    return true;
  }
}
// adresse
const addressErrorMsg = document.getElementById("addressErrorMsg");
function validateAddress(adresse) {
  if (regexName.test(adresse) == false) {
    return false;
  } else {
    addressErrorMsg.innerHTML = null;
    return true;
  }
}
// ville
const cityErrorMsg = document.getElementById("cityErrorMsg");
function validateCity(ville) {
  if (regexName.test(ville) == false) {
    return false;
  } else {
    cityErrorMsg.innerHTML = null;
    return true;
  }
}
// passage au format json les produits et les données du formulaire
function makeJsonData() {
  let contact = {
    firstName: prenom.value,
    lastName: nom.value,
    address: adresse.value,
    city: ville.value,
    email: mail.value,
  };

  let jsonData = JSON.stringify({ contact, products });
  return jsonData;
}


// preparation pour l'envoi des données vers l'API
const postUrl = "http://localhost:3000/api/products/order/";
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => {
  e.preventDefault(); //empêche le comportement de base du boutton
  if (cart.length === 0) {
    alert("Panier vide !!")
    return
  }
  // vérifie que les regex sont valides:
  let email = validateEmail(mail.value);
  let firstName = validateFirstName(prenom.value);
  let lastName = validateLastName(nom.value);
  let city = validateCity(ville.value);
  let address = validateAddress(adresse.value);
  if (
    email == false ||
    firstName == false ||
    lastName == false ||
    city == false
  ) {
    if (email == false) {
      emailErrorMsg.innerHTML = "Entrez une adresse e-mail valide.";
    }
    if (firstName == false) {
      firstNameErrorMsg.innerHTML = "Veuillez entrer un prénom valide.";
    }
    if (address == false){
      addressErrorMsg.innerHTML = "Veuillez entrer une adresse valide"
    }
    if (lastName == false) {
      lastNameErrorMsg.innerHTML = "Veuillez entrer un nom valide.";
    }
    if (city == false) {
      cityErrorMsg.innerHTML = "Veuillez entrer une ville valide.";
    }
    return;
  }

  // envoi des données vers l'api
  let jsonData = makeJsonData();
  fetch(postUrl, {
    method: "POST",
    body: jsonData,
    headers: {
      "Content-Type": "application/json"
    }
  })
    // récupération de la réponse
    .then((res) => res.json())
    // effacement du localStorage et redirection vers la page confirmation
    .then((data) => {
      localStorage.clear();
      let confirmationUrl = "./confirmation.html?id=" + data.orderId;
      window.location.href = confirmationUrl;
    })
    .catch(() => {
      alert("Une erreur est survenue, merci de revenir plus tard.");
    }); 
});


