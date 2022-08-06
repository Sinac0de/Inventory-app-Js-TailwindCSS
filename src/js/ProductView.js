import Storage from "./Storage.js";
const addNewProduct = document.getElementById("add-new-product");
class ProductView {

    constructor() {
        addNewProduct.addEventListener("click", e => this.addProduct(e));
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
        this.createProductsList();
    }

    createProductsList() {
        let result = '';
        this.products.forEach(product => {
            const productCategory = Storage.getAllCategories().find(c => c.id == product.category);
            result += ` 
            <div class="flex justify-between items-center">
                <span class="text-slate-400 ">${product.title}</span>
                <div class="flex items-center gap-x-3">
                <span class="text-slate-400">${new Date().toLocaleString("fa-IR", { dateStyle: "short" })}</span>
                <span
                        class="block text-slate-400 border border-slate-400 py-0.5 px-3 rounded-2xl text-sm">${productCategory.title}</span>
                        <span
                        class="flex items-center justify-center w-7 h-7 bg-slate-500 rounded-full border border-2 border-slate-400 text-slate-300">${product.quantity}</span>
                        <button class="text-red-300 border border-red-300 py-0.5 px-2 rounded-2xl">delete</button>
                        </div>
                        </div>`
        });

        const productsDOM = document.getElementById("products-list");
        productsDOM.innerHTML = result;

    }

}


export default new ProductView();