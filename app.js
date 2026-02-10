/* 
********************************
DOM SELECTORS:
********************************
*/
const quantityBtn = Array.from(document.querySelectorAll('.product__quantity-btn'));

const qtyValue = document.querySelector('.product__quantity-value');

const cartBtn = document.querySelector('.product__add-to-cart');

const currentPrice = document.querySelector('.product__price-current');
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
  console.log(checkoutPrice);
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
