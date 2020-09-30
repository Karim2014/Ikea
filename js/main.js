const btnBurger = document.querySelector(".btn-burger");
const btnClose = document.querySelector(".btn-close");
const catalog = document.querySelector(".catalog");
const subcatalog = document.querySelector(".subcatalog");
const catalogList = document.querySelector(".catalog-list");
const subcatalogHeader = document.querySelector(".subcatalog-header");
const btnReturn = document.querySelector(".btn-return");

// Делаем overlay
const overlay = document.createElement("div");
overlay.classList.add('overlay');
// добавляем в дом
document.body.insertAdjacentHTML("beforeend", overlay);

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
const openSubCatalog = event => {
  event.preventDefault();
  const itemList = event.target.closest(".catalog-list__item");
  if (itemList) {
    subcatalog.classList.add("subopen");
    subcatalogHeader.innerHTML = itemList.innerHTML;
  }
}

// закрыть подменю
const closeSubCatalog = () => {
  subcatalog.classList.remove("subopen");
}

// доабвлены обработчики
btnBurger.addEventListener("click", openCatalog);
btnClose.addEventListener("click", closeCatalog);
overlay.addEventListener("click", closeCatalog);
catalogList.addEventListener("click", openSubCatalog);
btnReturn.addEventListener("click", closeSubCatalog);

// обработка Esc для закрытия меню
document.addEventListener("keydown", event => {
  if (event.code === "Escape") {
    closeCatalog();
  }
});