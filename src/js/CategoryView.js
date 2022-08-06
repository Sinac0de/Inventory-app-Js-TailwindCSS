import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
class CategoryView {

    constructor() {
        addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
        this.categories = [];
    }


    addNewCategory(e) {
        e.preventDefault();//prevent refreshing the page
        const title = categoryTitle.value;
        const description = categoryDescription.value;
        if (!title || !description) return;//if the input values are empty
        Storage.saveCategory({ title, description });
        this.categories = Storage.getAllCategories();
        //update DOM : update select option in categories
        this.createCategoriesList();
    }

    setApp() {
        this.categories = Storage.getAllCategories();
    }

    createCategoriesList() {
        let result = '<option class="bg-slate-500 text-slate-300">select a category</option>';
        this.categories.forEach((element) => {
            result += `<option class="bg-slate-500 text-slate-300" value="${element.id}">${element.title}</option>`;
        });
        //add new category list to select DOM
        const categoryDOM = document.getElementById("product-category");
        categoryDOM.innerHTML = result;
    }

}


export default new CategoryView();