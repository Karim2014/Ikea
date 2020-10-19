import { getData } from "./getData.js"

const wishList = ["idd005", "idd007", "idd014"];

const cartList = [
  {
    id: 'idd015',
    count: 10
  },
  {
    id: 'idd029',
    count: 3
  },
  {
    id: 'idd080',
    count: 5  
  }
];

export const loadData = () => {

  if (location.search) {
    // переводим строку поиска в нормальный вид
    const search = decodeURI(location.search);
    // разделяем параметры
    const prop = search.split("=")[0].slice(1);
    const value = search.split("=")[1];

    // если параметр s - поиск
    if (prop === 's') {
      getData.search(value, console.log);     
      // понравившиеся
    } else if (prop === "wishlist") {
      getData.wishList(wishList, (data) => console.log(data));
    } else  {
      // по категории
      getData.category(prop, value, data => console.log(data));
    }

  }

  // корзина
  if (location.pathname.includes('cart')) {
    getData.cart(cartList, (data) => console.log(data));
  }

  // каталог и под каталог - ДОМАШКА
  getData.catalog(console.log);
  getData.subcatalog("Мебель", console.log)

};