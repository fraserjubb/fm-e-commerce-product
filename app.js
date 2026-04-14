/* 
********************************
DOM SELECTORS:
********************************
*/
const productTitle = document.querySelector('.product__title');
const quantityBtn = Array.from(document.querySelectorAll('.product__quantity-btn'));

const qtyValue = document.querySelector('.product__quantity-value');

const viewCartBtn = document.querySelector('.nav__shopping-cart');

const cartModal = document.querySelector('.cart');

const addToCartBtn = Array.from(document.querySelectorAll('.product__add-to-cart'));

const currentPrice = document.querySelector('.product__price-current');

const emptyCart = document.querySelector('.cart__empty-text');

const cartList = document.querySelector('.cart__list');
const cartItemText = Array.from(document.querySelectorAll('.cart__item-text'));
const cartCalcText = document.querySelector('.cart__calculation-text');
const cartTotal = document.querySelector('.cart__calculation-total');

const productImage = document.querySelector('.product__image');

const productThumbnails = [...document.querySelector('.product__thumbnails').children];

const lightboxThumbnails = [...document.querySelector('.lightbox__thumbnails').children];

// const productThumbnails = Array.from(document.querySelectorAll('.product__thumbnail'));
/* 
********************************
GLOBAL VARIABLES / GLOBAL OBJECTS:
********************************
*/
let cart = [];

const products = [
  {
    id: 'sneakers-1',
    name: 'Fall Limited Edition Sneakers',
    price: 125,
    image: 'assets/images/image-product-1.jpg',
  },
];

let quantityToAdd = Number(qtyValue.textContent);

let isLightboxActive = false;
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

// Select Cart Item
function selectCartItem(id) {
  return cart.find(item => item.id === id);
}

// Calculate subtotal
function getSubtotal(currentPrice, currentQty) {
  return `$${currentPrice * currentQty}`;
}

function createCartItemText(product, selectedQty) {
  const textDiv = document.createElement('div');
  textDiv.classList.add('cart__item-text');

  const cartItemName = document.createElement('p');
  cartItemName.textContent = product.name;
  cartItemName.classList.add('cart__item-name');

  // ITEM TEXT - calculations
  const calculationsDiv = document.createElement('div');
  calculationsDiv.classList.add('cart__calculations');

  const calculationText = document.createElement('p');
  calculationText.textContent = `$${product.price.toFixed(2)} x ${selectedQty}`;
  calculationText.classList.add('cart__calculation-text');

  const cartCalculationSubtotal = document.createElement('p');
  const subtotal = getSubtotal(product.price, selectedQty);
  cartCalculationSubtotal.textContent = subtotal;
  cartCalculationSubtotal.classList.add('cart__calculation-subtotal');

  calculationsDiv.append(calculationText, cartCalculationSubtotal);

  textDiv.append(cartItemName, calculationsDiv);
  return textDiv;
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

function createTrashButton() {
  const trashButton = document.createElement('button');
  trashButton.classList.add('cart__trash-btn');
  const svg = createTrashIcon();

  trashButton.append(svg);
  return trashButton;
}

function createCartItemImage(product) {
  const itemImage = document.createElement('img');
  itemImage.src = product.image;
  itemImage.classList.add('cart__item-image');
  return itemImage;
}

// Create New Cart Item
function createNewCartItem(product, selectedQty) {
  //  ITEM - element, ID
  const newListItem = document.createElement('li');
  newListItem.classList.add('cart__list-item');
  newListItem.dataset.productId = product.id;

  const itemImage = createCartItemImage(product);

  const itemText = createCartItemText(product, selectedQty);
  const trashButton = createTrashButton();

  // COMBINE INTO SINGLE ITEM
  newListItem.append(itemImage, itemText, trashButton);

  // add the newly created element and its content into the DOM
  cartList.appendChild(newListItem);
}

function updateExistingCartItemCalculations(cartItem, currentPrice, additionalQty) {
  const listItem = document.querySelector(`[data-product-id="${cartItem.id}"]`);

  const calculationText = listItem.querySelector('.cart__calculation-text');
  const subtotalText = listItem.querySelector('.cart__calculation-subtotal');

  cartItem.selectedQty += additionalQty;

  const subtotal = getSubtotal(currentPrice, cartItem.selectedQty);

  calculationText.textContent = `$${currentPrice.toFixed(2)} x ${cartItem.selectedQty}`;

  subtotalText.textContent = subtotal;
}

function handleAddToCart(e) {
  const id = e.currentTarget.dataset.productId;
  const product = findProductById(id);
  const selectedQty = quantityToAdd;
  const itemExists = Boolean(cart.find(item => item.id === id));

  if (selectedQty === 0) {
    return;
  }

  e.stopPropagation();
  if (itemExists) {
    const cartItem = selectCartItem(id);
    updateExistingCartItemCalculations(cartItem, product.price, selectedQty);
  } else {
    createNewCartItem(product, selectedQty);
    cart.push({ id, selectedQty });
    emptyCart.classList.toggle('hidden', cart.length > 0);
  }

  cartModal.classList.remove('hidden');
}

function deleteCartItem(e) {
  const deleteBtn = e.target.closest('.cart__trash-btn');

  if (!deleteBtn) {
    return;
  }

  e.stopPropagation();

  const listItem = deleteBtn.closest('.cart__list-item');
  const productId = listItem.dataset.productId;

  cart = cart.filter(item => item.id !== productId);

  listItem.remove();
  emptyCart.classList.toggle('hidden', cart.length > 0);
}

let currentIndex = 0;
const totalImages = lightboxThumbnails.length;

function updateLightboxImage() {
  lightboxImg.src = `assets/images/image-product-${currentIndex + 1}.jpg`;
}

/* 
********************************
EVENT LISTENERS:
********************************
*/
quantityBtn.forEach(btn => {
  btn.addEventListener('click', changeQty);
});

addToCartBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    handleAddToCart(e);
    cartModal.classList.remove('hidden');
  });
});

const setActiveThumbnail = index => {
  let thumbnailPool;
  if (!isLightboxActive) {
    thumbnailPool = productThumbnails;
  } else if (isLightboxActive) {
    thumbnailPool = lightboxThumbnails;
  }

  thumbnailPool.forEach(thumbnail => thumbnail.classList.remove('product__thumbnail--active'));

  thumbnailPool[index].classList.add('product__thumbnail--active');
};

productThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    if (isLightboxActive) return;

    const selectedImage = index + 1;
    productImage.src = `assets/images/image-product-${selectedImage}.jpg`;
    // console.log(index);
    setActiveThumbnail(index);
    // thumbnail.classList.toggle('product__thumbnail--active');
    currentIndex = index;
    return currentIndex;
  });
});

lightboxThumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    if (!isLightboxActive) return;

    currentIndex = index;
    updateLightboxImage();
    setActiveThumbnail(index);

    console.log(currentIndex);
    return currentIndex;
  });
});

cartList.addEventListener('click', e => deleteCartItem(e));

window.addEventListener('click', e => {
  if (cartModal.classList.contains('hidden')) return;
  const clickedCartButton = e.target.closest('.nav__shopping-cart');
  const clickedInsideCartUI = e.target.closest('.cart');

  if (clickedCartButton || clickedInsideCartUI) return;

  cartModal.classList.add('hidden');
});

document.addEventListener('keydown', e => {
  const keyName = e.key;

  if (keyName === 'Escape') {
    cartModal.classList.add('hidden');
  }
  console.log(keyName);
});

viewCartBtn.addEventListener('click', () => {
  cartModal.classList.toggle('hidden');
});
/*
********************************
INITIALIZATION:
********************************
*/

// const galleryImages = document.querySelectorAll('.product__gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

productImage.addEventListener('click', () => {
  lightboxImg.src = productImage.src;
  lightbox.classList.add('active');

  isLightboxActive = true;

  setActiveThumbnail(currentIndex);
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active');

  isLightboxActive = false;
});

/* Click outside image to close */
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');

    isLightboxActive = false;
  }
});

/* Optional UX: ESC key close */
document.addEventListener('keydown', e => {
  const keyName = e.key;

  if (keyName === 'Escape') {
    lightbox.classList.remove('active');

    isLightboxActive = false;
  }

  if (!isLightboxActive) return;

  if (keyName === 'ArrowLeft') {
    currentIndex = Math.max(0, currentIndex - 1);
  }

  if (keyName === 'ArrowRight') {
    currentIndex = Math.min(3, currentIndex + 1);
  }

  updateLightboxImage();
  setActiveThumbnail(currentIndex);
});

const previousImg = document.getElementById('lightbox__button-previous');
const nextImg = document.getElementById('lightbox__button-next');

previousImg.addEventListener('click', () => {
  currentIndex = Math.max(0, currentIndex - 1);
  updateLightboxImage();
  setActiveThumbnail(currentIndex);
});

nextImg.addEventListener('click', () => {
  currentIndex = Math.min(3, currentIndex + 1);
  updateLightboxImage();
  setActiveThumbnail(currentIndex);
});
