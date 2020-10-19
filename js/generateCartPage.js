import { getData } from './getData.js';
import userData from './userData.js';

const sendData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
  }

  return await response.json();
}

const sendCart = () => {

  const cartForm = document.querySelector('.cart-form');

  const data = {
    name: 'Плюшевый Мшка',
    count: 1,
  }

  cartForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(cartForm);

    const data = {};

    for (const [key, value] of formData){ 
      data[key] = value;
    }

    data.order = userData.cartList;

    sendData('https://jsonplaceholder.typicode.com/posts', JSON.stringify(data))
      .then(() => cartForm.reset())
      .catch(console.log);
  })

}

const generateCartPage = () => {
  
  // корзина
  if (location.pathname.includes('cart')) {
    const cartList = document.querySelector('.cart-list');

    const generateCards = (data) => {
      cartList.textContent = '';
      let totalPrice = 0;
      const cartTotalPrice = document.querySelector('.cart-total-price');

      if (!data.length) {
        cartList.textContent = 'Корзина пуста';
      }

      data.forEach(({name: itemName, id, img, price, description, count}) => {

        let options = '';
        let countUser = userData.cartList.find(item => item.id === id).count;

        if (countUser > count) {
          countUser = count;
        }

        for(let i = 1; i <= count; i++){
          options += `<option value=${i} ${countUser === i ? 'selected' : ''}>${i}</option>`
        }

        totalPrice += countUser * price

        cartList.insertAdjacentHTML('beforeend', `
          <li class="cart-item">
            <div class="product">
              <div class="product__image-container">
                <img src="${img[0]}" 
                  alt="${itemName} - ${description}">
              </div>
              <div class="product__description">
                <h3 class="product__name">
                  <a href="card.html#${id}">${itemName}</a></h3>
                <p class="product_description-text">${description}</p>
              </div>
              <div class="product__prices">
                <div class="product__price-type product__price-type-regular">
                  <div>
                    <div class="product__total product__total-regular">${price * countUser}.-</div>
                    ${  countUser > 1 ? `
                      <div class="product__price-regular">${price}.-</div>` : ``
                    }
                  </div>
                </div>
              </div>
              <div class="product__controls">

                <div class="product-controls__remove">
                  <button type="button" class="btn btn-remove" data-idd=${id}>
                    <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                  </button>
                </div>
                <div class="product-controls__quantity">
                  <select title="Выберите количество" aria-label="Выберите количество" data-idd=${id}>
                    ${options}
                  </select>
                </div>
              </div>
            </div>
          </li>
        `);

      });
      
      cartTotalPrice.textContent = totalPrice;
      
    };
    
    getData.cart(userData.cartList, generateCards);

    cartList.addEventListener('change', (e) => {
      userData.changeCountCartList = { 
        id: e.target.dataset.idd,
        count: +e.target.value,
      };
      getData.cart(userData.cartList, generateCards);
    })

    cartList.addEventListener('click', (e) => {
      const target = e.target;
      const btnRemove = target.closest('.btn-remove');
      if (btnRemove) {
        userData.deleteItemCart = btnRemove.dataset.idd;
        getData.cart(userData.cartList, generateCards);
      }
    })

    sendCart();
  };
}

export default generateCartPage;