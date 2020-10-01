'use-strict'

import { generateMenu } from "./menu.js"
import generateHeader from "./header.js"
import generateFooter from "./footer.js"
import generateCatalog from "./catalog.js"
import generateSubCatalog from "./subcatalog.js"
import { loadData } from "./loadData.js"

generateHeader();
generateFooter();
generateCatalog();
generateSubCatalog();
generateMenu();
loadData();