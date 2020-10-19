import { getData } from "./getData.js"

export const loadData = () => {
  
  

  // каталог и под каталог - ДОМАШКА
  getData.catalog(console.log);
  getData.subcatalog("Мебель", console.log)

};