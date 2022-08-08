import Storage from "./Storage.js";
const addNewProduct = document.getElementById("add-new-product");
const searchInput = document.getElementById("search-input");
const selectedSort = document.getElementById("sort-products");
class ProductView {

    constructor() {
        addNewProduct.addEventListener("click", e => this.addProduct(e));
        searchInput.addEventListener("input", e => this.searchProducts(e));
        selectedSort.addEventListener("change", e => this.sortProducts(e));
        this.products = [];
    }

    setApp() {
        this.products = Storage.getAllProducts();
    }

    addProduct(e) {
        e.preventDefault();
        const title = document.getElementById("product-title").value;
        const quantity = document.getElementById("product-quantity").value;
        const category = document.getElementById("product-category").value;
        //check if an input value is empty
        if (!title || !quantity || !category) return;
        //save product info in local storage
        Storage.saveProduct({ title, quantity, category });
        //refresh products array
        this.products = Storage.getAllProducts();
        this.createProductsList(this.products);
        //change selected sort to Select order by Date
        selectedSort.value = "";
    }

    createProductsList(products) {
        let result = '';
        products.forEach(product => {
            const productCategory = Storage.getAllCategories().find(c => c.id == product.category);
            //date options
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            };
            //products list content
            result += ` 
            <div class="flex justify-between items-center mb-4">
                <span class="text-slate-400 ">${product.title}</span>
                <div class="flex items-center gap-x-3">
                    <span class="text-slate-400">${new Date().toLocaleString("fa-IR", options)}</span>
                    <span class="block text-slate-400 border border-slate-400 py-0.5 px-3 rounded-2xl text-sm">${productCategory.title}</span>
                    <span class="flex items-center justify-center w-7 h-7 bg-slate-500 rounded-full border border-2 border-slate-400 text-slate-300">${product.quantity}</span>
                    <button class="text-red-300 border border-red-300 py-0.5 px-2 rounded-2xl" data-id="${product.id}">delete</button>
                </div>
            </div>`
        });

        const productsDOM = document.getElementById("products-list");
        productsDOM.innerHTML = result;

    }

    searchProducts(e) {
        const value = e.target.value.trim().toLowerCase();
        const filteredProducts = this.products.filter(p => p.title.toLowerCase().includes(value));
        //replace filtered products on DOM
        this.createProductsList(filteredProducts);
    }

    sortProducts(e) {
        const value = e.target.value;
        this.products = Storage.getAllProducts(value);
        this.createProductsList(this.products);
    }

}


export default new ProductView();