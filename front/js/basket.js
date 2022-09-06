class Basket {
    constructor(){
        //  récupèration des données du localStorage
        let basket = localStorage.getItem('basket');
        if (basket == null) {
            this.basket = [];
        } else {
            this.basket = JSON.parse(basket);
            //conversion des objets du local storage en format js.
        }
    }
    get length() {""
        return this.basket.length;
    }
    save() {
        //enregistre le panier dans localStorage : clé : 'basket' et valeur :(variable) basket.
        localStorage.setItem('basket', JSON.stringify(this.basket));
    }
    add(product) {
        
        let foundProduct = this.findProduct(product.id, product.option_produit)

        if (foundProduct != undefined) {
            foundProduct.quantity = parseInt(foundProduct.quantity)+parseInt(product.quantity);
        } else {
            this.basket.push(product);
        }
        this.save();
    }
    remove(product) {
        this.basket = this.basket.filter(p => p.id != product.id && p.option_produit != product.option_produit);
        this.save();
    }
    changeQuantity(product, quantity) {
        let foundProduct = this.findProduct(product.id, product.option_produit);
        if (foundProduct != undefined) {
            foundProduct.quantity = Math.min(parseInt(quantity), 100);
            if (foundProduct.quantity < 1) {
                this.remove(foundProduct);
            } else {
                this.save();
            }
        }
    }
    getNumberProduct() {
        let number = 0;
        for (let product of this.basket) {
            number += parseInt(product.quantity);
        }
        return number;
    
    }
    
    findProduct(id, color) {
        let foundProduct = this.basket.find(p => p.id == id && p.option_produit == color);
        if(foundProduct != undefined) {
            return foundProduct;
        } else {
            console.log("no product found");
            return null;
        }
    }
}

let cart = new Basket();

