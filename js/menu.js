import generateSubCatalog from "./subcatalog.js";
import { getData } from "./getData.js"

export const generateMenu = () => {
  const updateSubCatalog = generateSubCatalog();
  const btnBurger = document.querySelector(".btn-burger");
  const catalog = document.querySelector(".catalog");
  const subcatalog = document.querySelector(".subcatalog");
  const btnReturn = document.querySelector(".btn-return");

  // Делаем overlay
  const overlay = document.createElement("div");
  overlay.classList.add('overlay');
  // добавляем в дом
  document.body.insertAdjacentElement("beforeend", overlay);

  // открытие меню
  const openCatalog = () => {
    catalog.classList.add("open");
    overlay.classList.add("active")
  }

  // закрытие меню
  const closeCatalog = () => {
    closeSubCatalog();
    catalog.classList.remove("open");
    overlay.classList.remove("active")
  }

  // открыть подменю
  const handleCatalog = event => {
    event.preventDefault();
    const target = event.target;
    const itemList = target.closest(".catalog-list__item");
    if (itemList) {
      console.log(target.textContent);
      getData.subcatalog(target.textContent, (data) => {
        updateSubCatalog(target.textContent, data);
        subcatalog.classList.add("subopen");
      });

    }
    if (event.target.closest(".btn-close")) {
      closeCatalog();
    }
  }

  // закрыть подменю
  const closeSubCatalog = () => {
    subcatalog.classList.remove("subopen");
  }

  // доабвлены обработчики
  btnBurger.addEventListener("click", openCatalog);
  overlay.addEventListener("click", closeCatalog);
  catalog.addEventListener("click", handleCatalog);
  subcatalog.addEventListener("click", (event) => {
    const btnReturn = event.target.closest(".btn-return");

    if (btnReturn) closeSubCatalog();
  })


  // обработка Esc для закрытия меню
  document.addEventListener("keydown", event => {
    if (event.code === "Escape") {
      closeCatalog();
    }
  });
}