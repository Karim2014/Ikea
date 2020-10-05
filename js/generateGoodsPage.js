import { getData } from "./getData.js"

const wishList = ["idd005", "idd007", "idd014"];

const generateGoodsPage = () => {

  const mainHeader = document.querySelector(".main-header");
  const goodsList = document.querySelector(".goods-list");

  const generateCards = (data) => {
    goodsList.textContent = "";

    let contentHTML = "";

    if (data.length === 0) {
      contentHTML = `
        <div>По вашему запросу ничего не найдено</div>
      `;      
    }

    data.forEach(item => {
      contentHTML += `
        <li class="goods-list__item">
          <a class="goods-item__link" href="card.html#${item.id}">
            <article class="goods-item">
              <div class="goods-item__img">
                <img src="${item.img[0]}"
                  data-second-image="${item.img[2]}" alt="${item.name}">
              </div>
              <p class="goods-item__new">Новинка</p>
              <h3 class="goods-item__header">${item.name}</h3>
              <p class="goods-item__description">${item.description}</p>
              <p class="goods-item__price">
                <span class="goods-item__price-value">${item.price}</span>
                <span class="goods-item__currency"> ₽</span>
              </p>
              <button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="${item.id}"></button>
            </article>
          </a>
        </li>
      `;
    })

    goodsList.insertAdjacentHTML("afterbegin", contentHTML);
  }

  if (location.pathname.includes("goods") && location.search) {
    // переводим строку поиска в нормальный вид
    const search = decodeURI(location.search);
    // разделяем параметры
    const prop = search.split("=")[0].slice(1);
    const value = search.split("=")[1];

    // если параметр s - поиск
    if (prop === 's') {
      getData.search(value, generateCards);  
      mainHeader.textContent = `Поиск : ${value}`   
      // понравившиеся
    } else if (prop === "wishlist") {
      getData.wishList(wishList, generateCards);
      mainHeader.textContent = `Список желаний`
    } else  {
      // по категории
      getData.category(prop, value, generateCards);
      mainHeader.textContent = value
    }

  }
}

export default generateGoodsPage;