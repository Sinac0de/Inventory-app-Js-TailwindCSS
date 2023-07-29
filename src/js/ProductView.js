import Storage from "./Storage.js";
const addNewProduct = document.getElementById("add-new-product");
const searchInput = document.getElementById("search-input");
const selectedSort = document.getElementById("sort-products");
//total products quantity:
const totalquantity = document.getElementById("total-quantity");
//TODO یه مودال بساز که زمانی که روی دکمه ادیت زدن باز بشه و تایتل و کوانتیتی و کتگوری رو بگیره و دکمه کنسل و ادیت هم داشته باشه و بعد توی استوریج ذخیره بشه

class ProductView {
  constructor() {
    addNewProduct.addEventListener("click", (e) => this.addProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
    this.productsTotalQuantity();
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
    if (!title || !quantity || category == "select a category" || !category) {
      alert("محصول افزوده نشد!\n لطفا همه مقادیر خواسته شده را وارد کنید.");
      return;
    }
    //save product info in local storage
    Storage.saveProduct({ title, quantity, category });
    //refresh products array
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    //change selected sort to Select order by Date
    selectedSort.value = "";
  }

  createProductsList(products) {
    let result = "";
    products.forEach((product) => {
      const productCategory = Storage.getAllCategories().find(
        (c) => c.id == product.category
      );
      //date options
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      console.log(productCategory);
      //products list content
      result += ` 
            <div class="flex justify-between items-center mb-4 overflow-auto">
                <span class="text-slate-400 ">${product.title}</span>
                <div class="flex items-center gap-x-3">
                    <span class="whitespace-nowrap overflow-hidden text-slate-400 text-ellipsis inline-block border border-slate-500">${new Date().toLocaleString(
                      "fa-IR",
                      options
                    )}</span>
                    <span class="block text-slate-400 border border-slate-400 py-0.5 px-3 rounded-2xl text-sm">${
                      productCategory.title
                    }</span>
                    <span class="flex items-center justify-center w-7 h-7 bg-slate-500 rounded-full border border-2 border-slate-400 text-slate-300">${
                      product.quantity
                    }</span>
                   
                    <button class="delete-btn text-red-300 border border-red-300 py-0.5 px-2 rounded-2xl" data-product-id="${
                      product.id
                    }">delete</button>
                    <button class="text-slate-300 text-xl" data-product-id="${
                      product.id
                    }"><i class="fa-solid fa-pen-to-square"></i></button>
                </div>
            </div>`;
    });

    const productsDOM = document.getElementById("products-list");
    productsDOM.innerHTML = result;

    const deleteBtns = [...document.querySelectorAll(".delete-btn")];

    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.deleteProduct(e));
    });
  }

  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    //replace filtered products on DOM
    this.createProductsList(filteredProducts);
  }

  sortProducts(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }

  deleteProduct(e) {
    const productId = e.target.dataset.productId;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }

  productsTotalQuantity() {
    const products = Storage.getAllProducts();
    const sum = products.reduce((prev, curr) => {
      return prev + parseInt(curr.quantity);
    }, 0);
    totalquantity.innerHTML = sum;
  }
}

export default new ProductView();
