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
    const search = decodeURI(location.search);
    const prop = search.split("=")[0].slice(1);
    const value = search.split("=")[1];
    console.log("prop = ", prop);
    console.log("value = ", value);

    if (prop === 's') {
      getData.search(value, console.log);     
    } else if (prop === "wishlist") {
      getData.wishList(wishList, (data) => console.log(data));
    } else  {
      getData.category(prop, value, data => console.log(data));
    }

  }

  if (location.hash) {
    getData.item(location.hash.substring(1), (item) => { console.log(item) });
  }

  if (location.pathname.includes('cart')) {
    getData.cart(cartList, (data) => console.log(data));
  }

  getData.catalog(console.log);
  getData.subcatalog("Мебель", console.log)

};