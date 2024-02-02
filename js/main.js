const chooseColor = document.querySelectorAll('.choose__color-btn');
const contentItem = document.querySelectorAll('.content-item');
const cards = document.querySelectorAll('.card');

const shopping_cart = document.querySelector('.shopping-cart');
const cart_btns = document.querySelectorAll('.add-to-cart');

let left = 0;
let card_size = 25.4;
let total_card_size = cards.length * card_size - card_size * 4;

chooseColor.forEach(function (element) {
  element.addEventListener('click', open);
});

function open(evt) {
  const target = evt.currentTarget;
  const button = target.dataset.button;
  const contentActive = document.querySelectorAll(`.${button}`);

  chooseColor.forEach(function (item) {
    item.classList.remove('choose__color-btn--active');
  });

  target.classList.add('choose__color-btn--active');

  contentItem.forEach(function (item) {
    item.classList.remove('content-item--active');
  });

  contentActive.forEach(function (item) {
    item.classList.add('content-item--active');
  });
}

if (window.matchMedia('(max-width: 768px)').matches) {
  card_size = 52;
  total_card_size = cards.length * card_size - card_size * 2;
}

for (cart_btn of cart_btns) {
  cart_btn.onclick = (e) => {
    shopping_cart.classList.add('active');

    let product_count = Number(shopping_cart.getAttribute('data-product-count')) || 0;
    shopping_cart.setAttribute('data-product-count', product_count + 1);

    let target_parent = e.target.parentNode.parentNode.parentNode;
    target_parent.style.zIndex = '100';

    let img = target_parent.querySelector('img');
    let flying_img = img.cloneNode();
    flying_img.classList.add('flying-img');

    target_parent.appendChild(flying_img);

    const flying_img_pos = flying_img.getBoundingClientRect();
    const shopping_cart_pos = shopping_cart.getBoundingClientRect();

    let data = {
      left:
        shopping_cart_pos.left -
        (shopping_cart_pos.width / 2 + flying_img_pos.left + flying_img_pos.width / 2),
      top: shopping_cart_pos.bottom - flying_img_pos.bottom + 30,
    };

    console.log(data.top);

    flying_img.style.cssText = `
                                --left : ${data.left.toFixed(2)}px;
                                --top : ${data.top.toFixed(2)}px;
                                `;

    setTimeout(() => {
      target_parent.style.zIndex = '';
      target_parent.removeChild(flying_img);
      shopping_cart.classList.remove('active');
    }, 1000);
  };
}
