import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
    //set App => categories: ok , products : ok
    CategoryView.setApp();
    ProductView.setApp();
    //create categories options
    CategoryView.createCategoriesList();
    //create products options
    ProductView.createProductsList();
});
