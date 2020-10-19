'use-strict'

import generateHeader from "./header.js"
import generateFooter from "./footer.js"
import generateCatalog from "./catalog.js"
import generateGoodsPage from "./generateGoodsPage.js"
import generateItemPage from "./generateItemPage.js";
import { loadData } from "./loadData.js"

generateHeader();
generateFooter();
generateCatalog();
generateGoodsPage();
generateItemPage();
//loadData();