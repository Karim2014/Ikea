import { getData } from "./getData.js"

export const loadData = () => {
  
  // корзина
  if (location.pathname.includes('cart')) {
    getData.cart(cartList, (data) => console.log(data));
  }

  // каталог и под каталог - ДОМАШКА
  getData.catalog(console.log);
  getData.subcatalog("Мебель", console.log)

};