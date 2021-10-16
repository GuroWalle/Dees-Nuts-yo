// Adder buttonsene til js
let carts = document.querySelectorAll('.add-cart');


// Navn, bilde, pris og om det er i handlevogna til å begyne med 
let products = [
   {
      name: 'Roasted Almonds',
      tag: 'almonds',
      price: 5,
      inCart: 0
   },
   {
      name: 'Salted Chashews',
      tag: 'chashew',
      price: 8,
      inCart: 0
   },
   {
      name: 'Raw Pumkin Seeds',
      tag: 'pumkin',
      price: 4,
      inCart: 0
   },
   {
      name: 'Roasted Pine Nuts',
      tag: 'pine-nuts',
      price: 4,
      inCart: 0
   },
   {
      name: 'Raw Pistachio',
      tag: 'pistachios',
      price: 7,
      inCart: 0
   },
   {
      name: 'Raw Walnuts',
      tag: 'walnuts',
      price: 5,
      inCart: 0
   }
];


// Adder en eventlistener på alle 'add to cart' knappene 
for (let index = 0; index < carts.length; index++) {
   carts[index].addEventListener('click', () => {
      cartNumbers(products[index]);                      // gjør at man vet hvilket produkt man velger
      totalCost(products[index])                         // gjør at man velger riktig pris
   })
}


// Gjør at selvom man refresher siden blir produktene(tallet) i handlevogna
function onLoadCartNumbers() {
   let productNumbers = localStorage.getItem('cartNumbers');

   if (productNumbers) {
      document.querySelector('.cart span').textContent = productNumbers;
   }
}


// Gjør at produktene blir lagt til i handlevogna
function cartNumbers(product) {
   let productNumbers = localStorage.getItem('cartNumbers');

   productNumbers = parseInt(productNumbers);            // localStorage = string -> parseInt = numbers

   if (productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.cart span').textContent = productNumbers + 1;
   } else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.cart span').textContent = 1;
   }
   setItems(product);
}


// Gjør at man kan legge til flere produkter uten at de blandes med hverandre
function setItems(product) {
   let cartItems = localStorage.getItem('productsInCart');
   cartItems = JSON.parse(cartItems);


   if (cartItems != null) {         // != is different

      if (cartItems[product.tag] === undefined) {
         cartItems = {
            ...cartItems,
            [product.tag]: product
         }
      }
      cartItems[product.tag].inCart += 1;
   } else {
      product.inCart = 1;
      cartItems = {
         [product.tag]: product
      }
   }
   localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


// Gjør at prisen til alle produktene i handlevogna blir kalkulert sammen
function totalCost(product) {
   let cartCost = localStorage.getItem('totalCost');

   console.log("My cartCost is", cartCost);
   console.log(typeof cartCost);

   if (cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + product.price);
   } else {
      localStorage.setItem("totalCost", product.price);
   }
}

/**** CART ****/
function displayCart() {
   let cartItems = localStorage.getItem("productsInCart");
   cartItems = JSON.parse(cartItems);
   let productContainer = document.querySelector(".products");
   let cartCost = localStorage.getItem('totalCost');


   console.log(cartItems);
   if (cartItems && productContainer) {
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
         productContainer.innerHTML +=
            `
            <div class="product">
               <button> ❌ </button>
               <img src="../assets/${item.tag}.jpeg">
               <span> ${item.name} </span>
            </div>

            <div class="price">$${item.price},00</div>

            <div class="quantity">${item.inCart}</div>

            <div class="total">$${item.inCart * item.price},00</div>
            `
      });

      productContainer.innerHTML +=
         `<div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
               Basket Total
            </h4>
            <h4 class="basketTotal">
               $${cartCost},00
            </h4>
         </div>`
   }
}


// Caller funksjonen med en gang
onLoadCartNumbers();
displayCart(); //?????