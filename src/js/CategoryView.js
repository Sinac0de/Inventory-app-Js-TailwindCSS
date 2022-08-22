import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const toggleAddCategoryBtn = document.querySelector("#toggle-add-category")
const addCategoryWrapper = document.getElementById("add-category-wrapper");
const cancelAddCategoryBtn = document.getElementById("cancel-add-category");

class CategoryView {

    constructor() {
        addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
        toggleAddCategoryBtn.addEventListener("click", (e) => this.toggleAddCategory(e));
        cancelAddCategoryBtn.addEventListener("click", (e) => this.cancelAddCategory(e));
        this.categories = [];
    }


    addNewCategory(e) {
        e.preventDefault();//prevent refreshing the page
        const title = categoryTitle.value;
        const description = categoryDescription.value;
        if (!title || !description) {//if the input values are empty
            alert("دسته بندی مورد نظر افزوده نشد!\n لطفا همه مقادیر خواسته شده را وارد کنید.");
            return;
        }
        Storage.saveCategory({ title, description });
        this.categories = Storage.getAllCategories();
        //update DOM : update select option in categories
        this.createCategoriesList();
        addCategoryWrapper.classList.add("hidden");
        toggleAddCategoryBtn.classList.remove("hidden");
        //clear typed values
        this.clearInputValues();
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

    toggleAddCategory(e) {
        e.preventDefault();
        addCategoryWrapper.classList.remove("hidden");
        toggleAddCategoryBtn.classList.add("hidden");

    }

    cancelAddCategory(e) {
        e.preventDefault();
        addCategoryWrapper.classList.add("hidden");
        toggleAddCategoryBtn.classList.remove("hidden");
        //clear typed values
        this.clearInputValues();
    }

    clearInputValues() {
        document.querySelector("#category-title").value = "";
        document.querySelector("#category-description").value = "";
    }

}


export default new CategoryView();