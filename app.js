/* 
********************************
DOM SELECTORS:
********************************
*/
const productTitle = document.querySelector('.product__title');
const quantityBtn = Array.from(document.querySelectorAll('.product__quantity-btn'));

const qtyValue = document.querySelector('.product__quantity-value');

const cartBtn = document.querySelector('.product__add-to-cart');

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
let total = Number(qtyValue.textContent);
const priceNow = Number(currentPrice.textContent.slice(1));

let checkoutPrice;
let currentQTY = 0;
/* 
********************************
FUNCTIONS:
********************************
*/
function changeQty() {
  if (this.dataset.action === 'decrement' && total >= 1) {
    total--;
  } else if (this.dataset.action === 'increment') {
    total++;
  }
  qtyValue.textContent = total;
  return total;
}

function calcCart() {
  addElement();

  // currentQTY += total;
  // checkoutPrice = priceNow * currentQTY;

  // cartItemText[0].textContent = productTitle.textContent;
  // cartCalcText.textContent = `${currentPrice.textContent} x ${currentQTY}`;
  // cartTotal.textContent = `$${checkoutPrice}`;
  // return checkoutPrice;
}
/* 
********************************
EVENT LISTENERS:
********************************
*/
quantityBtn.forEach(btn => {
  btn.addEventListener('click', changeQty);
});

cartBtn.addEventListener('click', calcCart);

/*
********************************
INITIALIZATION:
********************************
*/
productThumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    console.log(thumbnail.src);
  });
});
// console.log(productImage.src);
// console.log(productThumbnails[2]);

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

function addElement() {
  // create a new list item element
  const newListItem = document.createElement('li');
  newListItem.classList.add('cart__list-item');

  // create image element
  const cartItemImage = document.createElement('img');
  cartItemImage.src = 'assets/images/image-product-1.jpg';
  cartItemImage.classList.add('cart__item-image');

  // create item text
  const textDiv = document.createElement('div');
  textDiv.classList.add('cart__item-text');

  const cartItemName = document.createElement('p');
  cartItemName.textContent = 'Fall Limited Edition Sneakers';
  cartItemName.classList.add('cart__item-name');

  // ITEM TEXT - calculations
  const calculationsDiv = document.createElement('div');
  calculationsDiv.classList.add('cart__calculations');

  const cartCalculationText = document.createElement('p');
  cartCalculationText.textContent = '$125.00 x 3';
  cartCalculationText.classList.add('cart__calculation-text');

  const cartCalculationSubtotal = document.createElement('p');
  cartCalculationSubtotal.textContent = '$375.00';
  cartCalculationSubtotal.classList.add('cart__calculation-subtotal');

  calculationsDiv.append(cartCalculationText, cartCalculationSubtotal);

  textDiv.append(cartItemName, calculationsDiv);

  const svg = createTrashIcon();
  newListItem.append(cartItemImage, textDiv, svg);

  // add the newly created element and its content into the DOM
  cartList.appendChild(newListItem);
}

addElement();
