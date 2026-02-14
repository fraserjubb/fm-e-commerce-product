/* 
********************************
DOM SELECTORS:
********************************
*/
const productTitle = document.querySelector('.product__title');
const quantityBtn = Array.from(document.querySelectorAll('.product__quantity-btn'));

const qtyValue = document.querySelector('.product__quantity-value');

const cartBtn = Array.from(document.querySelectorAll('.product__add-to-cart'));

const currentPrice = document.querySelector('.product__price-current');

const cartList = document.querySelector('.cart__list');
const cartItemText = Array.from(document.querySelectorAll('.cart__item-text'));
const cartCalcText = document.querySelector('.cart__calculation-text');
const cartTotal = document.querySelector('.cart__calculation-total');

const productImage = document.querySelector('.product__image');

const productThumbnails = Array.from(document.querySelectorAll('.product__thumbnail'));
/* 
********************************
GLOBAL VARIABLES / GLOBAL OBJECTS:
********************************
*/
const products = [
  {
    id: 'sneakers-1',
    name: 'Fall Limited Edition Sneakers',
    price: 125,
    image: 'assets/images/image-product-1.jpg',
  },
];

let quantityToAdd = Number(qtyValue.textContent);
const currentPriceValue = Number(currentPrice.textContent.slice(1));

let subtotal;
let cartItemQuantity = 0;
/* 
********************************
FUNCTIONS:
********************************
*/

/*
******
UPDATE QUANTITY
******
*/
function changeQty() {
  if (this.dataset.action === 'decrement' && quantityToAdd >= 1) {
    quantityToAdd--;
  } else if (this.dataset.action === 'increment') {
    quantityToAdd++;
  }
  qtyValue.textContent = quantityToAdd;
  return quantityToAdd;
}

/*
******
ADD TO CART
******
*/
// Find Product
function findProductById(id) {
  return products.find(product => product.id === id);
}

// Calculate subtotal
function getSubtotal() {
  cartItemQuantity += Number(qtyValue.textContent);
  console.log(cartItemQuantity);
  subtotal = currentPriceValue * cartItemQuantity;
  console.log(subtotal);
  return subtotal;
}

// Create Trash Icon
function createTrashIcon() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.classList.add('cart__trash-icon');

  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute(
    'd',
    'M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z',
  );

  svg.appendChild(path);
  return svg;
}

// Create New Cart Item
function createNewCartItem(product) {
  // create a new list item element
  const newListItem = document.createElement('li');
  newListItem.classList.add('cart__list-item');

  // ITEM IMAGE
  const cartItemImage = document.createElement('img');
  cartItemImage.src = product.image;
  cartItemImage.classList.add('cart__item-image');

  // ITEM TEXT - div, name
  const textDiv = document.createElement('div');
  textDiv.classList.add('cart__item-text');

  const cartItemName = document.createElement('p');
  cartItemName.textContent = product.name;
  cartItemName.classList.add('cart__item-name');

  // ITEM TEXT - calculations
  const calculationsDiv = document.createElement('div');
  calculationsDiv.classList.add('cart__calculations');

  const cartCalculationText = document.createElement('p');
  cartCalculationText.textContent = `$${product.price.toFixed(2)} x ${qtyValue.textContent}`;
  cartCalculationText.classList.add('cart__calculation-text');

  const cartCalculationSubtotal = document.createElement('p');
  // cartCalculationSubtotal.textContent = '$375.00';
  cartCalculationSubtotal.textContent = getSubtotal();
  cartCalculationSubtotal.classList.add('cart__calculation-subtotal');

  calculationsDiv.append(cartCalculationText, cartCalculationSubtotal);

  textDiv.append(cartItemName, calculationsDiv);

  // TRASH BTN
  const trashButton = document.createElement('button');
  trashButton.classList.add('cart__trash-btn');
  const svg = createTrashIcon();

  trashButton.append(svg);

  // COMBINE INTO SINGLE ITEM
  newListItem.append(cartItemImage, textDiv, trashButton);

  // add the newly created element and its content into the DOM
  cartList.appendChild(newListItem);
}

function handleAddToCart(e) {
  const id = e.currentTarget.dataset.productId;
  const product = findProductById(id);

  createNewCartItem(product);
  return product;
}

/* 
********************************
EVENT LISTENERS:
********************************
*/
quantityBtn.forEach(btn => {
  btn.addEventListener('click', changeQty);
});

cartBtn.forEach(btn => {
  btn.addEventListener('click', e => handleAddToCart(e));
});

productThumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    console.log(thumbnail.src);
  });
});

/*
********************************
INITIALIZATION:
********************************
*/
