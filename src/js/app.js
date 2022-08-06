import CategoryView from "./CategoryView.js";

document.addEventListener("DOMContentLoaded", () => {
    //set App => categories: ok
    CategoryView.setApp();
    //create categories options
    CategoryView.createCategoriesList();
});
