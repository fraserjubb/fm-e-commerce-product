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
  currentQTY += total;
  checkoutPrice = priceNow * currentQTY;

  cartItemText[0].textContent = productTitle.textContent;
  cartCalcText.textContent = `${currentPrice.textContent} x ${currentQTY}`;
  cartTotal.textContent = `$${checkoutPrice}`;
  return checkoutPrice;
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
