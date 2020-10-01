const PARAM = {
  cat: "category",
  subcat: "subcategory",
  search: ['name', 'description', 'category', 'subcategory']
}

export const getData = {
  url: "database/dataBase.json",
  // обращаемся к бд, преобразовуем в json и передаем в callback
  get(process) {
    fetch(this.url)
      .then((response) => response.json())
      .then(process);
  },
  // понравившиеся. list : список понравивишхся
  wishList(list, callback) {
    this.get((data) => {
      // фильтруем, если во всем списке встречается с одинаковыми idd
      const result = data.filter(item => list.includes(item.id));
      // передаем на внешнюю обработку
      callback(result);
    })
  },
  // определнный товар. value : idd товара
  item(value, callback) {
    this.get((data) => {
      // ищем конкретный элемент по idd, переданному в мфдгу
      const result = data.find(item => item.id === value);
      // передаем на внешнюю обработку
      callback(result);
    })
  },
  // корзина. list : список idd товаров в корзине
  cart(list, callback) {
    this.get((data) => {
      // фильтр по конкретному idd
      const result = data.filter(item => list
        .some(obj => obj.id === item.id));
        // передаем на внешнюю обработку
      callback(result);
    })
  },
  // категория prop : параметр (subcat || cat); value : значение параметра
  category(prop, value, callback) {
    this.get((data) => {
      // фильтр для поиска конкретной категории
      const result = data.filter(item => 
        // по свойтсву, определенному в легенде. И в нижний регистр для регистронезависимости
        item[PARAM[prop]].toLowerCase() === value.toLowerCase());
        // передаем на внешнюю обработку
      callback(result);
    })
  },
  // поиск. Value = значение строки поиска
  search(value, callback) {
    this.get(data => {
      // ищем по всем полям
      const result = data.filter(item => {
        for (const prop in item) {
          if (PARAM.search.includes(prop) &&
           item[prop]
            .toLowerCase()
            .includes(value.toLowerCase())) {
            return true;
          } 
        }
      })
      // передаем на внешнюю обработку
      callback(result);
    })
  },
  // возварщает список достпуных католбогв в базе
  catalog(callback) {
    this.get(data => {
      // делаем множество, мапим
      const catalogSet = new Set(data.map(item => item[PARAM.cat]));
      // преобразовуем в массив
      const result = [...catalogSet];
      // передаем на внешнюю обработку
      callback(result);
    });
  },
  // возварщает список достпуных подкатологв в базе
  subcatalog(value, callback) {
    this.get(data => {
      // делаем множетсво из фильтра по катеогрии
      const subcatSet = new Set(
        data
        .filter(item => item[PARAM.cat] === value)
        // далее мапим все эти подкатегории
        .map(item => item[PARAM.subcat]));
    // преобразуем в массив
    const result = [...subcatSet];
    // передаем на внешнюю обработку
    callback(result);
    })
  }
}